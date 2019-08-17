BEGIN;

TRUNCATE
  author_name,
  author_title
  RESTART IDENTITY CASCADE;

INSERT INTO lesfic_authors (name, titles)
VALUES
("Fletcher DeLancey", ["The Caphenon (Chronicles of Alsea) (Volume 1)", "Without A Front: The Producer's Challenge (Chronicles of Alsea Book 2)", "Without A Front: The Warrior's Challenge (Chronicles of Alsea Book 3)", "Catalyst (Chronicles of Alsea Book 4)", "Vellmar the Blade (Chronicles of Alsea Book 5)", "Outcaste (Chronicles of Alsea Book 6)", "RESILIENCE (Chronicles of Alsea Book 7)", "Uprising (Chronicles of Alsea Book 8)", "Mac vs. PC"]),
("Caren J. Werlinger",["Neither Present Time", "The Beast That Never Was", "Looking Through Windows", "In This Small Spot", "Cast Me Gently", "A Bittersweet Garden", "When the Stars Sang", "Year of the Monsoon", "Turning for Home", "Rising From the Ashes: The Chronicles of Caymin (The Dragonmage Saga Book 1)", "The Portal: The Chronicles of Caymin (The Dragonmage Saga Book 2)", "The Standing Stones: The Chronicles of Caymin (The Dragonmage Saga Book 3)"]),
("Jae",["Perfect Rhythm (Fair Oaks Book 1)", "Not the Marrying Kind (Fair Oaks Book 2)", "Falling Hard", "Conflict of Interest (Portland Police Bureau Series Book 1)", "Next of Kin: A Romantic Suspense Novel (Portland Police Bureau Series Book 2)", "Backwards to Oregon", "Paper Love", "Just for Show", "Happily Ever After", "Something in the Wine (The Moonstone Series Book 1)", "Heart Trouble", "Under a Falling Star", "Hidden Truths", "Departure from the Script (The Hollywood Series Book 1)", "Damage Control (The Hollywood Series Book 2)", "Dress-tease (The Hollywood Series Book 3)", "Just Physical (The Hollywood Series Book 4)", "True Nature", "Second Nature", "Nature of the Pack"]),
("Jeanine Hoffman", ["Lights and Sirens", "Strength in Numbers", "Back Swing", "Stranger Than Fiction", "Credit Worthy", "Truth Or Fiction"]);

INSERT INTO lesfic_genres (genre, titles)
VALUES
("scifi", ["The Caphenon (Chronicles of Alsea) (Volume 1)", "Without A Front: The Producer's Challenge (Chronicles of Alsea Book 2)", "Without A Front: The Warrior's Challenge (Chronicles of Alsea Book 3)", "Catalyst (Chronicles of Alsea Book 4)", "Vellmar the Blade (Chronicles of Alsea Book 5)", "Outcaste (Chronicles of Alsea Book 6)", "RESILIENCE (Chronicles of Alsea Book 7)", "Uprising (Chronicles of Alsea Book 8)"]), 
("romance", ["Mac vs. PC", "Perfect Rhythm (Fair Oaks Book 1)", "Not the Marrying Kind (Fair Oaks Book 2)", "Falling Hard", "Paper Love", "Just for Show", "Happily Ever After", "Something in the Wine (The Moonstone Series Book 1)", "Heart Trouble", "Under a Falling Star", "Departure from the Script (The Hollywood Series Book 1)", "Damage Control (The Hollywood Series Book 2)", "Dress-tease (The Hollywood Series Book 3)", "Just Physical (The Hollywood Series Book 4)", "Lights and Sirens", "Strength in Numbers", "Back Swing"]),
("paranormal", ["True Nature", "Second Nature", "Nature of the Pack", "Stranger Than Fiction", "Truth Or Fiction", "Neither Present Time", "The Beast That Never Was"]),
("fantasy",["Rising From the Ashes: The Chronicles of Caymin (The Dragonmage Saga Book 1)", "The Portal: The Chronicles of Caymin (The Dragonmage Saga Book 2)", "The Standing Stones: The Chronicles of Caymin (The Dragonmage Saga Book 3)"]);
COMMIT;