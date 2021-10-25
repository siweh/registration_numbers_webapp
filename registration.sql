-- create table towns(
--     id serial not null primary key,
--     town  varchar not null,
--     town_tag varchar not null,
--     UNIQUE(town)
-- );

-- create table registration_numbers(
--     id serial not null primary key,
--     registration_number  varchar not null,
--     -- UNIQUE(registration_number),
--     town_id int,
--     foreign key (town_id) references towns(id)
-- );

-- insert into towns(town, town_tag) values('cape town', 'CA');
-- insert into towns(town, town_tag) values('paarl', 'CJ');
-- insert into towns(town, town_tag) values('bellville', 'CY');

SELECT registration_numbers.registration_number 
FROM registration_numbers, towns 
WHERE towns.id = registration_numbers.town_id 
AND towns.town_tag in ('CA', 'CJ');



-- SELECT *
-- FROM registation_numbers

-- SELECT *
-- FROM towns