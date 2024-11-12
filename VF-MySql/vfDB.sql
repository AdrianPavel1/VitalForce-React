CREATE DATABASE  IF NOT EXISTS `vf` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `vf`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: vf
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `breakfast`
--

DROP TABLE IF EXISTS `breakfast`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `breakfast` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `goal` varchar(255) NOT NULL,
  `Quantity` varchar(50) DEFAULT NULL,
  `Proteins` decimal(10,2) DEFAULT NULL,
  `Carbohydrates` decimal(10,2) DEFAULT NULL,
  `Fat` decimal(10,2) DEFAULT NULL,
  `Ingredients` text DEFAULT NULL,
  `Method` text DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `breakfast`
--

LOCK TABLES `breakfast` WRITE;
/*!40000 ALTER TABLE `breakfast` DISABLE KEYS */;
INSERT INTO `breakfast` VALUES (1,'Cheese omelette','muscle gain','363 kcal',17.00,0.10,33.00,'INGREDIENTS: 2 eggs, ½ tbsp olive oil, 1 tbsp butter, 15g mature cheddar, finely grated','METHOD: STEP 1: Crack the eggs into a jug and whisk well with a fork. Season with a pinch of salt. STEP 2: Heat the oil and butter in a medium non-stick frying pan over a medium-low heat. Once the butter has started to foam, pour in the eggs and tilt to cover the base of the pan. Using a spatula, gently draw in the eggs from four points so there are folds in the centre. Do this once or twice, then leave the eggs to cook gently for 2-3 mins, until there\'s a little raw egg still in the middle. Sprinkle over the cheese and, using your spatula, gently fold the omelette in half. Switch off the heat and let the residual heat from the pan melt the cheese for 1 min. Slide onto your plate and sprinkle over some black pepper to serve.','cheseOmletMG.png'),(2,'Protein pancakes with banana','muscle gain','400 kcal',28.00,38.00,14.00,'INGREDIENTS: 3 eggs, 75g porridge oats, 1 large ripe banana, 2 tbsp protein powder, any kind, 2 tbsp milk, any kind, 1 tbsp baking powder, ¼ tsp ground cinnamon, neutral oil, for the pan','METHOD: STEP 1: Tip the eggs, oats, banana, protein powder, milk, baking powder and cinnamon into a blender and blitz for 1-2 mins until smooth. Check the oats have broken down, if not, blitz for another minute. STEP 2: Heat a drizzle of oil in a pan. Pour or ladle in 2-3 rounds of batter, leaving a little space between each to spread. Cook for 1-2 mins until bubbles start to appear on the surface and the underside is golden. Flip over and cook for another minute until cooked through. Transfer to a warmed oven and repeat with the remaining batter. STEP 3: Serve topped with a dollop of Greek yogurt, sliced bananas and maple syrup.','ProteinPankMG.png'),(3,'Potato fritters','muscle gain','589 kcal',19.00,53.00,32.00,'INGREDIENTS: 800g (3 large) potatoes, peeled, 1 onion, 3 tbsp plain flour, 2 eggs, lightly beaten, 3 tbsp vegetable oil, 4 tbsp soured cream, 1 ripe avocado, thinly sliced, 4 eggs, fried, 4 spring onions, trimmed and finely sliced','METHOD: PREPARATION METHOD: STEP 1: Grate the potatoes and onion on a coarse box grater. Wrap in a clean tea towel and squeeze out as much liquid as possible. Transfer to a large bowl and mix in the flour and plenty seasoning. Stir in the egg. STEP 2: Heat a little of the oil in a large non-stick frying pan. Use 2-3 tbsp of the mix per fritter and drop into the pan, cooking for 3-4 mins on each side over a medium-high heat, using a spatula to turn. Transfer to a plate lined with kitchen paper and continue with the remaining oil and mixture (it\'s best to cook in batches so as not to overcrowd the pan). STEP 3: Serve 3 fritters per person, each stack topped with the soured cream, avocado and a fried egg. Sprinkle over spring onions to serve.','PotatoFritersMG.png'),(7,'Poached eggs with smoked salmon and bubble & squeak','weight loss','310 kcal',19.00,29.00,13.00,'INGREDIENTS: 1 tbsp rapeseed oil; 140g white cabbage, finely chopped; 2 spring onions, finely sliced; 300g whole new potato; 1 tbsp snipped chives; 2 medium eggs, at room temperature; 75g smoked salmon','METHOD: STEP 1: Cook the potatoes in a pan of boiling water until tender, then drain. STEP 2: Heat the oil in a non-stick frying pan or wok. Sweat the cabbage and the spring onions in the pan for a couple of mins. Meanwhile, chop and squash the potatoes roughly, then add to the pan along with the chives. Cook for 4-5 mins, flip it over (don’t worry if it breaks) and cook for a further 4-5 mins. STEP 3: Meanwhile, bring a small pan of water to a rolling boil, then reduce the heat so it is just simmering. Crack the eggs into the pan and simmer for about 3 mins until the whites are cooked and the yolk is just beginning to set. Remove with a slotted spoon and drain on kitchen paper. STEP 4: To serve, divide the bubble & squeak between 2 plates, place the smoked salmon and poached eggs on top and grind over a little black pepper, to taste.','PoachedEggsWL.png\r\n'),(8,'Perfect scrambled eggs recipe','weight loss','254 kcal',18.00,4.00,19.00,'INGREDIENTS: 2 large free range eggs; 6 tbsp single cream or full cream milk; a knob of butter','METHOD: STEP 1: Lightly whisk 2 large eggs, 6 tbsp single cream or full cream milk and a pinch of salt together until the mixture has just one consistency. STEP 2: Heat a small non-stick frying pan for a minute or so, then add a knob of butter and let it melt. Don’t allow the butter to brown or it will discolour the eggs. STEP 3: Pour in the egg mixture and let it sit, without stirring, for 20 seconds. Stir with a wooden spoon, lifting and folding it over from the bottom of the pan. STEP 4: Let it sit for another 10 seconds then stir and fold again. STEP 5: Repeat until the eggs are softly set and slightly runny in places. Remove from the heat and leave for a moment to finish cooking. STEP 6: Give a final stir and serve the velvety scramble without delay.','scrambledEggsWL.png'),(9,'Spicy tomato and egg dish','weight loss','340 kcal',21.00,21.00,20.00,'INGREDIENTS: 1 tbsp olive oil; 2 red onions, chopped; 1 red chilli, deseeded and finely chopped; 1 garlic clove, sliced; small bunch coriander stalks and leaves chopped separately; 2 cans cherry tomatoes; 1 tsp caster sugar; 4 eggs','METHOD: STEP 1: Heat the oil in a frying pan that has a lid, then soften the onions, chilli, garlic and coriander stalks for 5 mins until soft. Stir in the tomatoes and sugar, then bubble for 8-10 mins until thick. Can be frozen for 1 month. STEP 2: Using the back of a large spoon, make 4 dips in the sauce, then crack an egg into each one. Put a lid on the pan, then cook over a low heat for 6-8 mins, until the eggs are done to your liking. Scatter with the coriander leaves and serve with crusty bread.','SUSWL.png');
/*!40000 ALTER TABLE `breakfast` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `card_meal`
--

DROP TABLE IF EXISTS `card_meal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card_meal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `meal_name` varchar(100) DEFAULT NULL,
  `calories` int(11) DEFAULT NULL,
  `protein` int(11) DEFAULT NULL,
  `carbs` int(11) DEFAULT NULL,
  `fat` int(11) DEFAULT NULL,
  `total_foods` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`total_foods`)),
  `date` date DEFAULT NULL,
  `green` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `username` (`username`),
  CONSTRAINT `card_meal_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card_meal`
--

LOCK TABLES `card_meal` WRITE;
/*!40000 ALTER TABLE `card_meal` DISABLE KEYS */;
INSERT INTO `card_meal` VALUES (70,'Adrian11','Meal1',200,4,47,0,'[{\"name\":\"Sweet potatoes\",\"calories\":\"200\",\"carbs\":\"47\",\"fat\":\"0\",\"protein\":\"4\"}]','2024-10-01',0),(71,'Adrian11','Meal1',6842,550,663,212,'[{\"name\":\"Cottage cheese\",\"calories\":\"2178\",\"carbs\":\"76\",\"fat\":\"96\",\"protein\":\"244\"},{\"name\":\"Cottage cheese\",\"calories\":\"2178\",\"carbs\":\"76\",\"fat\":\"96\",\"protein\":\"244\"},{\"name\":\"Brown rice\",\"calories\":\"2466\",\"carbs\":\"511\",\"fat\":\"20\",\"protein\":\"58\"},{\"name\":\"Chicken breast\",\"calories\":\"20\",\"carbs\":\"0\",\"fat\":\"0\",\"protein\":\"4\"}]','2024-10-02',1),(73,'Adrian11','Meal1',32666,3667,1133,1433,'[{\"name\":\"Cottage cheese\",\"calories\":\"32666\",\"carbs\":\"1133\",\"fat\":\"1433\",\"protein\":\"3667\"}]','2024-10-03',1),(74,'Adrian11','Meal1',9799,1100,340,430,'[{\"name\":\"Cottage cheese\",\"calories\":\"9799\",\"carbs\":\"340\",\"fat\":\"430\",\"protein\":\"1100\"}]','2024-10-04',1),(75,'Adrian11','Meal1',9799,1100,340,430,'[{\"name\":\"Cottage cheese\",\"calories\":\"9799\",\"carbs\":\"340\",\"fat\":\"430\",\"protein\":\"1100\"}]','2024-10-05',1),(76,'Adrian11','Meal1',690,67,0,43,'[{\"name\":\"Salmon fillet\",\"calories\":\"684\",\"carbs\":\"0\",\"fat\":\"43\",\"protein\":\"66\"},{\"name\":\"Cottage cheese\",\"calories\":\"0\",\"carbs\":\"0\",\"fat\":\"0\",\"protein\":\"0\"},{\"name\":\"Salmon fillet\",\"calories\":\"6\",\"carbs\":\"0\",\"fat\":\"0\",\"protein\":\"1\"}]','2024-10-08',1),(77,'Adrian11','cas',583,106,0,14,'[{\"name\":\"Chicken breast\",\"calories\":\"549\",\"carbs\":\"0\",\"fat\":\"12\",\"protein\":\"103\"},{\"name\":\"Eggs\",\"calories\":\"34\",\"carbs\":\"0\",\"fat\":\"2\",\"protein\":\"3\"}]','2024-10-08',1),(78,'Adrian11','er',361,30,3,26,'[{\"name\":\"Eggs\",\"calories\":\"361\",\"carbs\":\"3\",\"fat\":\"26\",\"protein\":\"30\"}]','2024-10-08',1),(79,'Adrian11','Meal4',38,9,0,0,'[{\"name\":\"Canned tuna\",\"calories\":\"38\",\"carbs\":\"0\",\"fat\":\"0\",\"protein\":\"9\"}]','2024-10-08',1),(80,'Adrian11','ee2',684,66,0,43,'[{\"name\":\"Salmon fillet\",\"calories\":\"684\",\"carbs\":\"0\",\"fat\":\"43\",\"protein\":\"66\"},{\"name\":\"Cottage cheese\",\"calories\":\"0\",\"carbs\":\"0\",\"fat\":\"0\",\"protein\":\"0\"},{\"name\":\"Salmon fillet\",\"calories\":\"0\",\"carbs\":\"0\",\"fat\":\"0\",\"protein\":\"0\"}]','2024-10-08',1),(81,'Adrian11','Meal6',0,0,0,0,'[]','2024-10-08',1),(82,'Adrian11','Meal7',2466,58,511,20,'[{\"name\":\"Brown rice\",\"calories\":\"2466\",\"carbs\":\"511\",\"fat\":\"20\",\"protein\":\"58\"}]','2024-10-08',1),(83,'Adrian11','m1',493,33,7,33,'[{\"name\":\"Scrambled eggs\",\"calories\":\"493\",\"carbs\":\"7\",\"fat\":\"33\",\"protein\":\"33\"},{\"name\":\"Eggs\",\"calories\":\"0\",\"carbs\":\"0\",\"fat\":\"0\",\"protein\":\"0\"}]','2024-10-09',0),(88,'Adrian11','Meal1',405,90,0,5,'[{\"name\":\"Turkey breast\",\"calories\":\"405\",\"carbs\":\"0\",\"fat\":\"5\",\"protein\":\"90\"}]','2024-11-02',0),(96,'Adrian11','Meal1',22866,2567,793,1003,'[{\"name\":\"Cottage cheese\",\"calories\":\"22866\",\"carbs\":\"793\",\"fat\":\"1003\",\"protein\":\"2567\"}]','2024-11-11',1),(103,'Adrian11','eggs',531,51,0,34,'[{\"name\":\"Salmon fillet\",\"calories\":\"480\",\"carbs\":\"0\",\"fat\":\"30\",\"protein\":\"47\"},{\"name\":\"Eggs\",\"calories\":\"51\",\"carbs\":\"0\",\"fat\":\"4\",\"protein\":\"4\"}]','2024-11-10',0),(110,'Adrian11','e3',686,67,0,43,'[{\"name\":\"Salmon fillet\",\"calories\":\"686\",\"carbs\":\"0\",\"fat\":\"43\",\"protein\":\"67\"}]','2024-11-13',0),(111,'Adrian11','2e',172,14,1,12,'[{\"name\":\"Eggs\",\"calories\":\"172\",\"carbs\":\"1\",\"fat\":\"12\",\"protein\":\"14\"}]','2024-11-09',0),(112,'Adrian11','eggs',345,23,5,23,'[{\"name\":\"Scrambled eggs\",\"calories\":\"345\",\"carbs\":\"5\",\"fat\":\"23\",\"protein\":\"23\"}]','2024-11-08',0),(113,'Adrian11','Meal1',1188,133,41,52,'[{\"name\":\"Cottage cheese\",\"calories\":\"1188\",\"carbs\":\"41\",\"fat\":\"52\",\"protein\":\"133\"}]','2024-11-07',0),(114,'Adrian11','Meal1',10,0,2,0,'[{\"name\":\"Sweet potatoes\",\"calories\":\"10\",\"carbs\":\"2\",\"fat\":\"0\",\"protein\":\"0\"}]','2024-11-12',0),(115,'Adrian11','Meal2',686,67,0,43,'[{\"name\":\"Salmon fillet\",\"calories\":\"686\",\"carbs\":\"0\",\"fat\":\"43\",\"protein\":\"67\"}]','2024-11-11',1);
/*!40000 ALTER TABLE `card_meal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dinner`
--

DROP TABLE IF EXISTS `dinner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dinner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `goal` varchar(255) NOT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `Proteins` varchar(50) DEFAULT NULL,
  `Carbohydrates` varchar(50) DEFAULT NULL,
  `Fat` varchar(50) DEFAULT NULL,
  `Ingredients` text DEFAULT NULL,
  `Method` text DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dinner`
--

LOCK TABLES `dinner` WRITE;
/*!40000 ALTER TABLE `dinner` DISABLE KEYS */;
INSERT INTO `dinner` VALUES (1,'Chicken pasta bake','muscle gain',335,'33','41','30','4 tbsp olive oil; 1 onion, finely chopped; 2 garlic cloves, crushed; ¼ tsp chilli flakes; 2 x 400g cans chopped tomatoes; 1 tsp caster sugar; 6 tbsp mascarpone; 4 skinless chicken breasts, sliced into strips; 300g penne; 70g mature cheddar, grated; 50g grated mozzarella; ½ small bunch of parsley, finely chopped','STEP 1: Heat 2 tbsp of the oil in a pan over a medium heat and fry the onion gently for 10-12 mins. Add the garlic and chilli flakes and cook for 1 min. Tip in the tomatoes and sugar and season to taste. Simmer uncovered for 20 mins or until thickened, then stir through the mascarpone. STEP 2: Heat 1 tbsp of oil in a non-stick frying pan. Season the chicken and fry for 5-7 mins or until the chicken is cooked through. STEP 3: Heat the oven to 220C/200C fan/gas 7. Cook the penne following pack instructions. Drain and toss with the remaining oil. Tip the pasta into a medium sized ovenproof dish. Stir in the chicken and pour over the sauce. Top with the cheddar, mozzarella and parsley. Bake for 20 mins or until golden brown and bubbling.','pastaBake.png\r\n'),(2,'Vegan squash stew','muscle gain',802,'17','70','10','2 tbsp rapeseed oil; 320g large chestnut mushrooms, quartered; 2 bay leaves; 2 tbsp fresh rosemary; 4 red onions, quartered; 4 garlic cloves, thinly sliced; 320g prepared butternut squash; 600ml vegetable stock, made with 1 tbsp bouillon powder; 2 x 400g cans chickpeas, drained; 1 tbsp smoked paprika; 4 tbsp tomato purée; broccoli and peas, to serve; For the mash: 700g swede, peeled and cut into chunks; 850g potatoes, cut into chunks','STEP 1: Heat the oil in a large non-stick pan over a medium heat and fry the mushrooms, bay and rosemary for about 5 mins. Tip in the onions and garlic, and cook for a few minutes more until softened. STEP 2: Add the butternut squash, stock, chickpeas, smoked paprika and tomato purée. Cover and simmer for 40 minutes until the liquid has reduced to a thick gravy. STEP 3: About 25 mins before the end of cooking time, make the mash. Bring a large pan of water to the boil and cook the swede for 5 mins, then add the potatoes and boil for 15-20 mins until tender. Drain and mash with plenty of black pepper. STEP 4: Serve half the stew and mash now, then chill the rest to reheat and eat another day. Will keep chilled for up to three days. Reheat the stew in a pan until piping hot. The mash can be reheated in the microwave. Serve with broccoli and peas, if you like.','veganSquash.png'),(3,'Teriyaki & lime-glazed chicken wings','muscle gain',272,'30','36','17','2 tbsp rice flour; 900g chicken wings, thoroughly patted dry with kitchen paper; 4 tbsp soy sauce; 2 garlic cloves, grated; 10g ginger, peeled and grated; 4 tbsp light brown soft sugar; 1 tbsp cornflour; 1 lime, zested and juiced; 2 spring onions, sliced and left to curl in a bowl of ice water; 1 red chilli, thinly sliced; cooked jasmine rice and pak choi, to serve (optional)','STEP 1: Heat the oven to 220C/200C fan/gas 8. Line your largest baking tray with baking parchment. Tip the rice flour into a large bowl, season, then toss the chicken wings in the flour. Make sure they’re well coated, then spread evenly across the baking tray. Bake for 20 mins (or 15 mins in an air-fryer) until starting to brown. STEP 2: While the chicken cooks, make the glaze. Put the soy sauce, garlic, ginger, sugar and 150ml water in a small pan on a medium heat. Cook for 4-5 mins until bubbling and slightly thickened, then take out 2 tbsp and mix with the cornflour. Pour the cornflour mixture back into the glaze, whisking all the time, and cook for 3 mins until thickened. Squeeze in the lime juice. STEP 3: Once the chicken has been cooking for 20 mins, brush over most of the teriyaki glaze and return to the oven for another 20 mins (or air-fryer for 10 mins), basting once more during cooking. STEP 4: Remove from the oven, top with a final brush of the glaze, then sprinkle with the lime zest, spring onions and chilli. Serve with fluffy rice and pak choi, if you like.','terikai.png'),(4,'Meatball & tomato soup','weight loss',425,'17','36','12','1½ tbsp rapeseed oil; 1 onion, finely chopped; 2 red peppers, deseeded and sliced; 1 garlic clove, crushed; ½ tsp chilli flakes; 2 x 400g cans chopped tomatoes; 100g giant couscous; 500ml hot vegetable stock; 12 pork meatballs; 150g baby spinach; ½ small bunch of basil; grated parmesan, to serve (optional)','STEP 1: Heat the oil in a saucepan. Fry the onion and peppers for 7 mins, then stir through the garlic and chilli flakes and cook for 1 min. Add the tomatoes, giant couscous, and veg stock and bring to a simmer. STEP 2: Season to taste, then add the meatballs and spinach. Simmer for 5-7 mins or until cooked through. Ladle into bowls and top with the basil and some parmesan, if you like.','meatball.png'),(5,'Lemon chicken stir-fry','weight loss',330,'38','19','6','2 tsp honey; 2 lemons, juiced; 150ml chicken stock; 2 tbsp soy sauce; 4 chicken breasts, cut into chunks; 1 tbsp cornflour; 1 tsp vegetable oil; 2 carrots, finely sliced; 1 red pepper, cut into chunks; 140g sugar snap peas','STEP 1: In a jug, mix together the honey, lemon, stock, and soy, then set aside. Toss the chicken in the cornflour so it’s completely coated. Heat the oil in a non-stick frying pan, then fry the chicken until it changes color and starts to become crisp around the edges. STEP 2: Add the carrots and red pepper, then fry for 1 min more. Pour the stock into the pan, bring to a simmer, then add the sugar snap peas and bubble everything together for 5-10 mins until the chicken is cooked and the veg are tender. Serve with noodles.','lemonChicken.png'),(6,'Confit salmon with tahini, pistachio & herb crust','weight loss',300,'35','5','35','800g side of salmon, skinned and pin-boned; 350ml olive oil; For the spiced salt: 1 tsp cardamom pods (about 12-14 pods), shells discarded; 1 tsp cumin seeds; 1 tsp caraway seeds; 1 tsp fennel seeds; 2 tbsp sea salt flakes; 1 lemon, zested; For the tahini sauce: 100g Greek yogurt; 30g tahini; 1 garlic clove, finely crushed; 1 lemon, juiced; For the topping: 75g pistachios, roughly chopped; 1 banana shallot, finely chopped; 1 long red chili, deseeded and finely chopped; 1 small pomegranate, seeds only; 20g dill, finely chopped; 20g flat-leaf parsley, leaves picked and finely chopped; 10g mint, leaves picked and finely chopped; 2 tbsp olive oil','STEP 1: Toast all the spices for the spiced salt in a dry pan for 2-3 mins until fragrant, then grind with the salt and lemon zest to a coarse powder using a pestle and mortar. Sprinkle over both sides of the fish. Put on a plate, cover and chill for 1 hr. STEP 2: Heat the oven to 150C/130C fan/gas 2. Rinse the salmon well and pat dry with kitchen paper. Lay the salmon in a roasting tin that fits it snugly, then pour over the 350ml olive oil. Cook for 25 mins until the salmon is still pink in the middle but beginning to flake easily. STEP 3: While the salmon is cooking, make the tahini sauce by whisking all the ingredients together in a bowl. In a second bowl, make the topping by mixing all the ingredients to loosely bind. STEP 4: When you are ready to serve, carefully lift the salmon out of the olive oil and lay on a serving platter. Spoon the tahini sauce over the fish, smooth over, then press the pistachio topping over the surface. Serve immediately.','salmonPistacio.png');
/*!40000 ALTER TABLE `dinner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foods`
--

DROP TABLE IF EXISTS `foods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `calories_per_100g` float NOT NULL,
  `fat_per_100g` float NOT NULL,
  `protein_per_100g` float NOT NULL,
  `carbs_per_100g` float NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foods`
--

LOCK TABLES `foods` WRITE;
/*!40000 ALTER TABLE `foods` DISABLE KEYS */;
INSERT INTO `foods` VALUES (1,'Chicken breast',165,3.6,31,0,'meat'),(2,'Salmon fillet',206,13,20,0,'meat'),(3,'Eggs',155,11,13,1.1,'eggs'),(4,'Cottage cheese',98,4.3,11,3.4,'dairy'),(5,'Skim milk',42,0.1,3.4,5,'dairy'),(6,'Quinoa',120,1.9,4.1,21.3,'grains'),(7,'Brown rice',111,0.9,2.6,23,'grains'),(8,'Oats',389,7,16.9,66.3,'grains'),(9,'Almonds',579,49,21,22,'nuts'),(10,'Bananas',89,0.3,1.1,22.8,'fruits'),(11,'Spinach',23,0.4,2.9,3.6,'vegetables'),(12,'Broccoli',34,0.4,2.8,6.6,'vegetables'),(13,'Sweet potatoes',86,0.1,1.6,20.1,'vegetables'),(14,'Greek yogurt',59,0.4,10,3.6,'dairy'),(15,'Canned tuna',116,1,26,0,'meat'),(16,'Turkey breast',135,1.6,30,0,'meat'),(17,'Beef steak',250,15,26,0,'meat'),(18,'Tofu',76,4.8,8,1.9,'plant-based'),(19,'Tempeh',192,10,20,8,'plant-based'),(20,'Lentils',116,0.4,9,20,'legumes'),(21,'Chickpeas',164,2.6,8.9,27.4,'legumes'),(22,'Black beans',132,0.5,8.9,23.7,'legumes'),(23,'Kidney beans',127,0.5,8.7,22.8,'legumes'),(24,'Edamame',121,5.2,11.9,8.9,'plant-based'),(25,'Peanut butter',588,50,25,20,'nuts'),(26,'Walnuts',654,65,15,14,'nuts'),(27,'Cashews',553,44,18,30,'nuts'),(28,'Pecans',691,72,9,14,'nuts'),(29,'Hazelnuts',628,61,15,17,'nuts'),(30,'Pumpkin seeds',446,19,25,54,'seeds'),(31,'Chia seeds',486,31,17,42,'seeds'),(32,'Flaxseeds',534,42,18,29,'seeds'),(33,'Sunflower seeds',584,51,21,20,'seeds'),(34,'Apples',52,0.2,0.3,14,'fruits'),(35,'Oranges',47,0.1,0.9,12,'fruits'),(36,'Strawberries',32,0.3,0.7,7.7,'fruits'),(37,'Blueberries',57,0.3,0.7,14.5,'fruits'),(38,'Raspberries',52,0.7,1.2,12,'fruits'),(39,'Pineapple',50,0.1,0.5,13,'fruits'),(40,'Grapes',69,0.2,0.6,18,'fruits'),(41,'Cucumber',16,0.1,0.7,3.6,'vegetables'),(42,'Carrots',41,0.2,0.9,10,'vegetables'),(43,'Bell peppers',31,0.3,1,6,'vegetables'),(44,'Cauliflower',25,0.3,1.9,4.9,'vegetables'),(45,'Zucchini',17,0.3,1.2,3.1,'vegetables'),(46,'Cooked rice',130,0.3,2.4,28,'grains'),(47,'Cooked quinoa',120,1.9,4.1,21.3,'grains'),(48,'Cooked oats',71,1.4,2.5,12,'grains'),(49,'Cooked lentils',116,0.4,9,20,'legumes'),(50,'Cooked chickpeas',164,2.6,8.9,27.4,'legumes'),(51,'Cooked black beans',132,0.5,8.9,23.7,'legumes'),(52,'Cooked kidney beans',127,0.5,8.7,22.8,'legumes'),(53,'Cooked edamame',121,5.2,11.9,8.9,'plant-based'),(54,'Baked salmon',206,13,22,0,'meat'),(55,'Grilled chicken breast',165,3.6,31,0,'meat'),(56,'Boiled eggs',155,11,13,1.1,'eggs'),(57,'Scrambled eggs',148,10,10,2,'eggs'),(58,'Boiled potatoes',87,0.1,1.9,20.4,'vegetables'),(59,'Mashed potatoes',88,3.4,1.7,14.3,'vegetables'),(60,'Steamed broccoli',35,0.4,2.4,7.2,'vegetables'),(61,'Steamed spinach',23,0.4,2.9,3.6,'vegetables'),(62,'Boiled carrots',35,0.2,0.8,8.2,'vegetables'),(63,'Grilled zucchini',17,0.3,1.2,3.1,'vegetables'),(64,'Roasted almonds',579,49,21,22,'nuts'),(65,'Roasted cashews',574,46,15,33,'nuts'),(66,'Roasted peanuts',567,49,26,16,'nuts'),(67,'Roasted pumpkin seeds',574,49,30,14,'seeds'),(68,'Roasted sunflower seeds',584,51,21,20,'seeds'),(69,'Cooked shrimp',99,0.3,24,0.2,'seafood'),(70,'Cooked tuna',116,1,26,0,'seafood'),(71,'Baked sweet potatoes',90,0.1,2,21,'vegetables'),(72,'Roasted Brussels sprouts',43,1.4,3.4,8.9,'vegetables'),(73,'Boiled green beans',35,0.2,1.8,7.9,'vegetables'),(74,'Steamed cauliflower',23,0.5,1.9,4.1,'vegetables'),(75,'Grilled bell peppers',31,0.3,1,6,'vegetables');
/*!40000 ALTER TABLE `foods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lunch`
--

DROP TABLE IF EXISTS `lunch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lunch` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `goal` varchar(255) NOT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `Proteins` varchar(50) DEFAULT NULL,
  `Carbohydrates` varchar(50) DEFAULT NULL,
  `Fat` varchar(50) DEFAULT NULL,
  `Ingredients` text DEFAULT NULL,
  `Method` text DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lunch`
--

LOCK TABLES `lunch` WRITE;
/*!40000 ALTER TABLE `lunch` DISABLE KEYS */;
INSERT INTO `lunch` VALUES (1,'Chicken & tzatziki wraps','weight loss',437,'35','25','12','1 cucumber, three-quarters deseeded and coarsely grated, the rest halved and sliced; 250g Greek yogurt; 500g chicken breast, thinly sliced; 2 tbsp olive oil; 4 wholemeal wraps; 4 large ripe tomatoes, thinly sliced','STEP 1: For the tzatziki, tip the grated cucumber and yogurt into a bowl, mix well and season. Set aside. Season the chicken with salt and pepper and rub with 1 tbsp of the olive oil. Heat the remaining oil in a pan over a medium heat. Cook the chicken for 8-10 mins until cooked through and golden brown. STEP 2: Warm the wraps in a dry pan or microwave. Spread 2 tbsp of the tzatziki onto each wrap, top with the chicken, tomatoes and sliced cucumber. Season with a little more pepper, if you like, then fold the sides of the wrap over the filling, roll up tightly and serve.','chicken-Tzatziki.png'),(2,'Chicken satay salad','weight loss',248,'38','24','10','1 tbsp tamari; 1 tsp medium curry powder; ¼ tsp ground cumin; 1 garlic clove, finely grated; 1 tsp clear honey; 2 skinless chicken breast fillets (or use turkey breast); 1 tbsp crunchy peanut butter (choose a sugar-free version with no palm oil, if possible); 1 tbsp sweet chilli sauce; 1 tbsp lime juice; sunflower oil, for wiping the pan; 2 Little Gem lettuce hearts, cut into wedges; ¼ cucumber, halved and sliced; 1 banana shallot, halved and thinly sliced; coriander, chopped; seeds from ½ pomegranate','STEP 1: Pour the tamari into a large dish and stir in the curry powder, cumin, garlic and honey. Mix well. Slice the chicken breasts in half horizontally to make 4 fillets in total, then add to the marinade and mix well to coat. Set aside in the fridge for at least 1 hr, or overnight, to allow the flavours to penetrate the chicken. STEP 2: Meanwhile, mix the peanut butter with the chilli sauce, lime juice, and 1 tbsp water to make a spoonable sauce. When ready to cook the chicken, wipe a large non-stick frying pan with a little oil. Add the chicken and cook, covered with a lid, for 5-6 mins on a medium heat, turning the fillets over for the last min, until cooked but still moist. Set aside, covered, to rest for a few mins. STEP 3: While the chicken rests, toss the lettuce wedges with the cucumber, shallot, coriander and pomegranate, and pile onto plates. Spoon over a little sauce. Slice the chicken, pile on top of the salad and spoon over the remaining sauce. Eat while the chicken is still warm.','sataySalad.png'),(3,'Bombay potato frittata','weight loss',385,'20','29','12','4 new potatoes, sliced into 5mm rounds; 100g baby spinach, chopped; 1 tbsp rapeseed oil; 1 onion, halved and sliced; 1 large garlic clove, finely grated; ½ tsp ground coriander; ½ tsp ground cumin; ¼ tsp black mustard seeds; ¼ tsp turmeric; 3 tomatoes, roughly chopped; 2 large eggs; ½ green chilli, deseeded and finely chopped; 1 small bunch of coriander, finely chopped; 1 tbsp mango chutney; 3 tbsp fat-free Greek yogurt','STEP 1: Cook the potatoes in a pan of boiling water for 6 mins, or until tender. Drain and leave to steam-dry. Meanwhile, put the spinach in a heatproof bowl with 1 tbsp water. Cover and microwave for 3 mins on high, or until wilted. STEP 2: Heat the rapeseed oil in a medium non-stick frying pan. Add the onion and cook over a medium heat for 10 mins until golden and sticky. Stir in the garlic, ground coriander, ground cumin, mustard seeds and turmeric, and cook for 1 min more. Add the tomatoes and wilted spinach and cook for another 3 mins, then add the potatoes. STEP 3: Heat the grill to medium. Lightly beat the eggs with the chilli and most of the fresh coriander and pour over the potato mixture. Grill for 4-5 mins, or until golden and just set, with a very slight wobble in the middle. STEP 4: Leave to cool, then slice into wedges. Mix the mango chutney, yogurt and remaining fresh coriander together. Serve with the frittata wedges.','bombay.png'),(4,'Feta & kale loaded sweet potato','muscle gain',435,'15','51','15','2 sweet potatoes; chickpeas, drained; 1 red onion, thinly sliced; 2 tbsp red wine vinegar; 30g feta, cut into small cubes; 1 tsp caster sugar; 1 tbsp olive oil; chilli flakes; 100g kale; 1 tbsp pumpkin seeds, toasted; rocket','STEP 1: Heat oven to 200C/180C fan/gas 6. Prick the sweet potatoes all over with a fork, then put them in a roasting tin and roast for 40 mins. Add the chickpeas to the tray, then roast for 10 mins more, until the potatoes are completely tender and the chickpeas have crisped a little. STEP 2: Meanwhile, mix the onion with the vinegar and a pinch of sugar and salt, and set aside to quick pickle. In another bowl, marinate the feta with the oil and chilli flakes. STEP 3: When the potatoes are nearly cooked, cook the kale in a pan with 50ml water for 3 mins until wilted, then season to taste. Halve the potatoes, divide between two plates and top each with the kale, chickpeas, red onion (reserving the vinegar), marinated feta and pumpkin seeds. Toss the rocket with the reserved vinegar, then serve on the side.','FETApotato.png'),(5,'Lentil & tuna salad','muscle gain',410,'28','26','15','2 tbsp sherry vinegar; 1 tsp Dijon mustard; 2 garlic cloves, finely grated; 50ml olive oil; 2 x 250g pouches ready-cooked puy lentils; 2 x 160g cans tuna steaks in spring water, drained and flaked; 160g cherry tomatoes, halved (about 10); 2 ready-roasted peppers, chopped; handful of parsley, finely chopped; ½ small bunch of chives, finely chopped, plus extra to garnish','STEP 1: Whisk the vinegar, mustard and garlic together in a small bowl. Slowly drizzle in the oil, whisking as you go, until emulsified, then season to taste. STEP 2: Add the lentils, tuna, tomatoes, peppers and herbs to a large bowl and toss together. Pour over the dressing and toss again. Divide between four bowls and garnish with the remaining chives.','LENTIL.png'),(6,'Paneer jalfrezi with cumin rice','muscle gain',249,'19','68','13','2 tsp cold-pressed rapeseed oil; 1 large and 1 medium onion, large one finely chopped and medium one cut into wedges; 2 large garlic cloves, chopped; 50g ginger, peeled and shredded; 2 tsp ground coriander; 2 tsp cumin seeds; 400g can chopped tomatoes; 1 tbsp vegetable bouillon powder; 135g paneer, chopped; 2 large peppers, seeded and chopped; 1 red or green chilli, deseeded and sliced; 25g coriander, chopped; For the rice: 260g brown basmati rice; 1 tsp cumin seeds','STEP 1: Heat 1 tsp oil a large non-stick frying pan and fry the chopped onions, garlic and half the ginger for 5 mins until softened. Add the ground coriander and cumin seeds and cook for 1 min more, then tip in the tomatoes, half a can of water and the bouillon. Blitz everything together with a stick blender until very smooth, then bring to a simmer. Cover and cook for 15 mins. STEP 2: Meanwhile, cook the rice and cumin seeds in a pan of boiling water for 25 mins, or until tender. STEP 3: Heat the remaining oil in a non-stick wok and fry the paneer until lightly coloured. Remove from the pan and set aside. Add the peppers, onion wedges and chilli to the pan and stir-fry until the veg is tender, but still retains some bite. Mix the stir-fried veg and paneer into the sauce with the chopped coriander, then serve with the rice. If youre following our Healthy Diet Plan, eat two portions of the curry and rice, then chill the rest for another day. Will keep for up to three days, covered, in the fridge. To serve on the second night, reheat the leftover portions in the microwave until piping hot.','pannerJALFREZI.png');
/*!40000 ALTER TABLE `lunch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_meals`
--

DROP TABLE IF EXISTS `user_meals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_meals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `calories` int(11) DEFAULT NULL,
  `proteins` int(11) DEFAULT NULL,
  `carbs` int(11) DEFAULT NULL,
  `fats` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `username` (`username`),
  CONSTRAINT `user_meals_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_meals`
--

LOCK TABLES `user_meals` WRITE;
/*!40000 ALTER TABLE `user_meals` DISABLE KEYS */;
INSERT INTO `user_meals` VALUES (1,'Adrian11','2024-10-01',200,4,47,0),(2,'Adrian11','2024-10-02',6842,550,663,212),(3,'Adrian11','2024-10-30',32666,3667,1133,1433),(4,'Adrian11','2024-10-03',32666,3667,1133,1433),(5,'Adrian11','2024-10-04',9799,1100,340,430),(6,'Adrian11','2024-10-05',9799,1100,340,430),(7,'Adrian11','2024-10-08',4822,336,514,146),(8,'Adrian11','2024-10-09',493,33,7,33),(9,'Adrian11','2024-11-02',405,90,0,5),(10,'Adrian11','2024-11-05',32666,3667,1133,1433),(11,'Adrian11','2024-11-11',23552,2634,793,1046),(12,'Adrian11','2024-11-10',531,51,0,34),(13,'Adrian11','2024-11-12',10,0,2,0),(14,'Adrian11','2024-11-13',686,67,0,43),(15,'Adrian11','2024-11-09',172,14,1,12),(16,'Adrian11','2024-11-08',345,23,5,23),(17,'Adrian11','2024-11-07',1188,133,41,52);
/*!40000 ALTER TABLE `user_meals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profiles`
--

DROP TABLE IF EXISTS `user_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_profiles` (
  `profile_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `age` int(3) DEFAULT NULL,
  `bodyType` varchar(50) DEFAULT 'average',
  `goal` varchar(100) DEFAULT 'maintenance',
  `weight` int(4) DEFAULT NULL,
  `height` int(4) DEFAULT NULL,
  `physicalActivity` varchar(100) DEFAULT 'sedentary',
  `gender` varchar(10) DEFAULT NULL,
  `neck_cm` int(4) DEFAULT NULL,
  `waist_cm` int(4) DEFAULT NULL,
  `hips` int(4) DEFAULT NULL,
  PRIMARY KEY (`profile_id`),
  KEY `fk_username` (`username`),
  CONSTRAINT `fk_username` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profiles`
--

LOCK TABLES `user_profiles` WRITE;
/*!40000 ALTER TABLE `user_profiles` DISABLE KEYS */;
INSERT INTO `user_profiles` VALUES (1,'Adrian',NULL,'average','maintenance',NULL,NULL,'sedentary',NULL,NULL,NULL,NULL),(2,'ado',11,'average','weight loss',11,11,'sedentary','male',11,11,11),(3,'Adrian1',11,'average','muscle gain',11,11,'moderate','male',11,11,11),(4,'ds',23,'average','muscle gain',23,23,'moderate','male',23,23,23),(5,'as',11,'average','muscle gain',9,11,'sedentary','female',11,11,11),(6,'rt',23,'average','muscle gain',75,178,'moderate','male',44,44,44),(7,'ad',14,'average','muscle gain',65,160,'sedentary','male',13,13,13),(8,'adi1',23,'average','muscle gain',75,178,'moderate','male',11,11,9),(9,'Adi11',12,'average','muscle gain',12,11,'sedentary','male',12,12,11),(10,'Adrian11',23,'average','muscle gain',75,178,'moderate','male',11,11,11),(11,'cris',23,'average','weight loss',46,155,'sedentary','female',22,22,22);
/*!40000 ALTER TABLE `user_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('ad','ad@ad','$2b$10$QvnWJvF7HpLo5.ho2IOSZeM4qC9cxSr5xisEuaTPTqs1taq6GgQmO'),('adi1','adi1@gmail.com','$2b$10$rIPMVIabkXN7pThuY8f1j.NBPmldvF7M2s5fN4ac6Oq.bkthtf95S'),('Adi11','adi12@gmail.com','$2b$10$be/W6W9nvaTYq9xd/ZUj8O9jSwHWjQ2LOvCzeB5iaVEB3eWguljC.'),('ado','adi@g','$2b$10$gkvhUMvltuPc/f0gJmx3Wervrp6GkYCjk94xrD7MZO26ulb2ZZ0Gi'),('Adrian','adi@gmail.com','$2b$10$26M6NXb5WZoyIvggfvaGHef146YFLoA6oUw.QHJ/xb5JqhtjCFoQC'),('Adrian1','Adrian@gmail.com','$2b$10$hU0PNElplctp4yjoYb7bq.NjpVHXOLzOa0BggNsIngzF.lwdG9Fg.'),('Adrian11','Adrian11@gmail.com','$2b$10$aIaJY05FhX7q5WNNhdWmee3zG/LLa/LqYWbg9RepXk36D8ZEJFWhC'),('as','as@as','$2b$10$F7btzqLazgyXkovWJUZEmOgZfQYlIUC71YcuI/R50v7yDcSrsSN/2'),('cris','cristiana_bcn@yahoo.com','$2b$10$sx02.v1pZV4P5SB2bllwf.vvyPl9.50RSmEV4NjHUiyFbfFcgsF1.'),('ds','ds@ds','$2b$10$tuYwBvcDNBPcrYLZ8hGoNesEKGSowWd4beAAFo98qEJ7ThAWUh2Hi'),('rt','rt@rt','$2b$10$Xvio5kMI8KLqjtIbDogXxeMkE7fxPlqUCPhkjzuRkPdFfBJMittEe');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-12 16:06:24
