-- Update "GM Hummer"
update inventory
set inv_description = replace(inv_description, 'the small interiors', 'a huge interior')
where inv_id = 10;

-- Update images paths

update inventory
set inv_image = replace(inv_image, '/images/', '/images/vehicles/');

update inventory
set inv_thumbnail = replace(inv_thumbnail, '/images/', '/images/vehicles/');