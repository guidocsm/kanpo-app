-- Datos de prueba para el Feed y el Detalle del partido.
--
-- Cómo usarlo: pegar en el SQL Editor de Supabase y ejecutar UNA sola vez (rol postgres, ignora RLS).
-- Requisito: debe existir al menos un perfil con role 'organizer' o 'admin' (match."organizerId" referencia a profile).
-- Los partidos quedan repartidos en los próximos 7 días (hora de Caracas) tomando "hoy" como día 0:
--   * libres, con pocas plazas (quedan <= 3) y llenos;
--   * el día +4 queda sin partidos a propósito (estado vacío del Feed);
--   * dos partidos 'closed' / 'cancelled' y uno en Maracaibo, que la app NO debe mostrar (status y ciudad).
-- Los partidos de hoy están a las 21:00 y 22:30: si ejecutas el seed más tarde, la app ocultará los que ya empezaron.
--
-- Sobre occupiedSlots: aquí se escribe a mano solo para poder probar la UI. En la base lo mantiene el trigger
-- refreshMatchOccupiedSlots (cuenta enrollments pending/approved cada vez que cambia enrollment; no hay trigger sobre match),
-- así que el valor del seed se mantiene hasta la primera inscripción real en ese partido, momento en que se recalcula.
--
-- Limpieza (ejecutar en este orden):
--   delete from public.match where "venueId" in (select id from public.venue where name in ('Ávila Gol', 'Caracas FC Pickup', 'Cancha JC', 'Cancha Norte', 'Cancha Maracaibo Centro'));
--   delete from public.venue where name in ('Ávila Gol', 'Caracas FC Pickup', 'Cancha JC', 'Cancha Norte', 'Cancha Maracaibo Centro');

do $$
declare
  seedDay date := (now() at time zone 'America/Caracas')::date;
  organizerProfileId uuid;
  format5Id uuid;
  format7Id uuid;
  format11Id uuid;
  venueAvilaGolId uuid;
  venueCaracasFcId uuid;
  venueCanchaJcId uuid;
  venueCanchaNorteId uuid;
  venueMaracaiboId uuid;
begin
  select id into organizerProfileId
  from public.profile
  where role in ('organizer', 'admin') and "isActive"
  order by "createdAt"
  limit 1;

  if organizerProfileId is null then
    raise exception 'seed.sql: crea primero un perfil con role organizer o admin (match."organizerId" lo necesita).';
  end if;

  select id into format5Id from public."matchFormat" where name = '5v5';
  select id into format7Id from public."matchFormat" where name = '7v7';
  select id into format11Id from public."matchFormat" where name = '11v11';

  if format5Id is null or format7Id is null or format11Id is null then
    raise exception 'seed.sql: faltan formatos 5v5, 7v7 u 11v11 en "matchFormat".';
  end if;

  -- Canchas (photoUrl queda en null para probar el fallback del hero; Cancha Norte no tiene zona ni coordenadas)
  insert into public.venue (name, address, zone, city, latitude, longitude)
  values ('Ávila Gol', 'Av. Sanz, El Hatillo, Caracas', 'El Hatillo', 'ccs', 10.4275, -66.8250)
  returning id into venueAvilaGolId;

  insert into public.venue (name, address, zone, city, latitude, longitude)
  values ('Caracas FC Pickup', 'Av. Francisco de Miranda, Los Palos Grandes, Caracas', 'Los Palos Grandes', 'ccs', 10.4980, -66.8460)
  returning id into venueCaracasFcId;

  insert into public.venue (name, address, zone, city, latitude, longitude)
  values ('Cancha JC', 'Calle Madrid, Las Mercedes, Caracas', 'Las Mercedes', 'ccs', 10.4830, -66.8630)
  returning id into venueCanchaJcId;

  insert into public.venue (name, address, zone, city)
  values ('Cancha Norte', 'Sector Norte, Caracas', null, 'ccs')
  returning id into venueCanchaNorteId;

  insert into public.venue (name, address, zone, city, latitude, longitude)
  values ('Cancha Maracaibo Centro', 'Av. 5 de Julio, Maracaibo', 'Centro', 'mbo', 10.6544, -71.6406)
  returning id into venueMaracaiboId;

  -- Partidos: día relativo a hoy + hora local de Caracas
  insert into public.match ("formatId", "venueId", "organizerId", "priceAmount", "startsAt", "occupiedSlots", status, rules)
  select
    seed.format_id,
    seed.venue_id,
    organizerProfileId,
    seed.price_amount,
    ((seedDay + seed.day_offset) + seed.start_time) at time zone 'America/Caracas',
    seed.occupied_slots,
    seed.match_status::public.matchstatus,
    seed.rules_text
  from (
    values
      -- Día 0 (hoy)
      (format7Id,  venueAvilaGolId,     4.99, 0, time '21:00',  4, 'open',      'Puntualidad: a los 10 minutos se libera el cupo.'),
      (format5Id,  venueCanchaJcId,     3.50, 0, time '22:30',  9, 'open',      null),
      -- Día 1
      (format7Id,  venueAvilaGolId,     4.99, 1, time '09:00',  4, 'open',      'Traer camiseta clara y oscura. Hay chalecos para el equipo que lo necesite.'),
      (format7Id,  venueAvilaGolId,     4.99, 1, time '10:00', 12, 'open',      null),
      (format5Id,  venueCaracasFcId,    3.99, 1, time '11:00', 10, 'open',      'Cancha techada. Prohibido tacos de aluminio.'),
      (format11Id, venueCanchaJcId,     6.50, 1, time '17:30',  2, 'open',      null),
      (format7Id,  venueAvilaGolId,     4.99, 1, time '15:00',  6, 'closed',    null),
      (format5Id,  venueMaracaiboId,    3.00, 1, time '19:00',  3, 'open',      null),
      -- Día 2
      (format5Id,  venueCaracasFcId,    3.99, 2, time '19:00',  7, 'open',      null),
      (format7Id,  venueCanchaNorteId,  5.00, 2, time '20:00', 14, 'open',      'Solo se permite calzado de suela lisa.'),
      (format11Id, venueCanchaJcId,     6.50, 2, time '12:00',  8, 'cancelled', null),
      -- Día 3
      (format7Id,  venueAvilaGolId,     4.99, 3, time '08:00',  1, 'open',      null),
      (format11Id, venueCanchaJcId,     6.50, 3, time '21:00', 20, 'open',      'Cancha con iluminación. Llevar agua.'),
      -- Día 4: sin partidos
      -- Día 5
      (format7Id,  venueAvilaGolId,     4.99, 5, time '10:00',  0, 'open',      null),
      (format5Id,  venueCanchaNorteId,  3.00, 5, time '18:00',  5, 'open',      null),
      -- Día 6
      (format7Id,  venueCaracasFcId,    5.50, 6, time '20:00', 13, 'open',      null),
      (format11Id, venueCanchaJcId,     6.50, 6, time '09:00', 22, 'open',      null)
  ) as seed (format_id, venue_id, price_amount, day_offset, start_time, occupied_slots, match_status, rules_text);
end
$$;
