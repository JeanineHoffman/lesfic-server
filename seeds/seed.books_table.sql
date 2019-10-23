BEGIN;
TRUNCATE TABLE
  books
  RESTART IDENTITY CASCADE;
INSERT INTO books (genre, title, author)
VALUES 


('scifi', 'The Caphenon (Chronicles of Alsea Volume 1)','Fletcher DeLancey'),
('scifi', 'Without A Front: The Producer''s Challenge (Chronicles of Alsea Book 2)','Fletcher DeLancey'),
('scifi', 'Without A Front: The Warrior''s Challenge (Chronicles of Alsea Book 3)','Fletcher DeLancey'),
('scifi', 'Catalyst (Chronicles of Alsea Book 4)','Fletcher DeLancey'),
('scifi', 'Vellmar the Blade (Chronicles of Alsea Book 5)','Fletcher DeLancey'),
('scifi', 'Outcaste (Chronicles of Alsea Book 6)','Fletcher DeLancey'),
('scifi', 'RESILIENCE (Chronicles of Alsea Book 7)','Fletcher DeLancey'),
('scifi','Uprising (Chronicles of Alsea Book 8)','Fletcher DeLancey'),
('romance','Mac vs. PC','Fletcher DeLancey' ),
('romance','Neither Present Time','Caren J. Werlinger'),
('romance',  'The Beast That Never Was','Caren J. Werlinger'),
('romance', 'Looking Through Windows','Caren J. Werlinger'),
('romance', 'In This Small Spot','Caren J. Werlinger'),
('romance', 'Cast Me Gently','Caren J. Werlinger'),
('romance', 'A Bittersweet Garden', 'Caren J. Werlinger'),
('romance', 'When the Stars Sang','Caren J. Werlinger'),
('romance', 'Year of the Monsoon','Caren J. Werlinger'),
('fantasy', 'Rising From the Ashes: The Chronicles of Caymin (The Dragonmage Saga Book 1)','Caren J. Werlinger'),
('fantasy', 'The Portal: The Chronicles of Caymin (The Dragonmage Saga Book 2)','Caren J. Werlinger'),
('fantasy','The Standing Stones: The Chronicles of Caymin (The Dragonmage Saga Book 3)','Caren J. Werlinger'),
('romance', 'Turning for Home','Caren J. Werlinger'),
('romance','Perfect Rhythm (Fair Oaks Book 1)','Jae'),
('romance','Not the Marrying Kind (Fair Oaks Book 2)','Jae'),
('romance','Falling Hard','Jae'),
('romance','Conflict of Interest (Portland Police Bureau Series Book 1)','Jae'),
('romance','Next of Kin: A Romantic Suspense Novel (Portland Police Bureau Series Book 2)','Jae'),
('romance','Backwards to Oregon','Jae'),
('romance','Paper Love','Jae'),
('romance', 'Just for Show','Jae'),
('romance','Happily Ever After','Jae'),
('romance', 'Something in the Wine (The Moonstone Series Book 1)','Jae'),
('romance','Damage Control (The Hollywood Series Book 2)','Jae'),
('romance','Dress-tease (The Hollywood Series Book 3)','Jae'),
('romance','Just Physical (The Hollywood Series Book 4)','Jae'),
('paranormal','True Nature','Jae'),
('paranormal','Second Nature','Jae'),
('paranormal','Nature of the Pack','Jae'),
('romance', 'Lights and Sirens','Jeanine Hoffman'),
('romance','Strength in Numbers','Jeanine Hoffman'),
('romance','Back Swing','Jeanine Hoffman'),
('paranormal','Stranger Than Fiction','Jeanine Hoffman'),
('romance','Credit Worthy','Jeanine Hoffman'),
('paranormal','Truth Or Fiction','Jeanine Hoffman');
COMMIT;