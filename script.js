/* ---- DISHES ---- */
var dishes=[
  {name:"Jollof Rice",origin:"West Africa (Nigeria / Ghana)",serves:"4–6",e:"🍚",bg:"#FFF3CC",tag:"West Africa",
   ing:[{n:"Long grain parboiled rice",a:true},{n:"Roma tomatoes",a:true},{n:"Red bell peppers",a:true},{n:"Scotch bonnet pepper",a:true},{n:"Tomato paste",a:true},{n:"Red palm oil",a:true},{n:"Chicken stock / bouillon cubes",a:true},{n:"Curry powder",a:true},{n:"Thyme (dried)",a:true},{n:"Maggi seasoning cubes",a:true},{n:"Bay leaves",a:true},{n:"White onions",a:true}]},
  {name:"Egusi Soup",origin:"Nigeria · West Africa",serves:"4–5",e:"🍲",bg:"#FFE8D6",tag:"West Africa",
   ing:[{n:"Egusi (ground melon seeds)",a:true},{n:"Spinach or bitter leaf",a:true},{n:"Red palm oil",a:true},{n:"Stockfish (dried)",a:true},{n:"Smoked catfish",a:true},{n:"Crayfish (ground)",a:true},{n:"Iru / locust beans",a:true},{n:"Scotch bonnet pepper",a:true},{n:"Seasoning cubes (Maggi)",a:true},{n:"Goat meat or beef",a:false},{n:"White onion",a:true}]},
  {name:"Pounded Yam & Egusi",origin:"Nigeria · West Africa",serves:"4",e:"🫙",bg:"#FEF5E4",tag:"West Africa",
   ing:[{n:"Yam flour (poundo yam)",a:true},{n:"Egusi (melon seeds)",a:true},{n:"Red palm oil",a:true},{n:"Smoked catfish",a:true},{n:"Crayfish (ground)",a:true},{n:"Iru (locust beans)",a:true},{n:"Scotch bonnet pepper",a:true},{n:"Maggi seasoning cubes",a:true},{n:"Spinach or bitter leaf",a:true},{n:"Stockfish",a:true}]},
  {name:"Suya Skewers",origin:"Northern Nigeria · West Africa",serves:"4–6",e:"🍢",bg:"#FFE8E7",tag:"West Africa",
   ing:[{n:"Suya spice mix (yaji)",a:true},{n:"Groundnut (peanut) paste",a:true},{n:"Beef sirloin or chicken thighs",a:false},{n:"Ginger powder",a:true},{n:"Garlic powder",a:true},{n:"Onion (sliced, for serving)",a:true},{n:"Tomatoes (for serving)",a:true},{n:"Vegetable oil",a:true}]},
  {name:"Fufu & Groundnut Soup",origin:"Ghana · West Africa",serves:"4",e:"🥣",bg:"#E8F5EC",tag:"West Africa",
   ing:[{n:"Fufu flour (cassava / plantain)",a:true},{n:"Groundnut (peanut) paste",a:true},{n:"Red palm oil",a:true},{n:"Smoked fish",a:true},{n:"Ground crayfish",a:true},{n:"Scotch bonnet pepper",a:true},{n:"Spinach or kontomire leaves",a:true},{n:"White onion",a:true}]},
  {name:"Pepper Soup",origin:"Nigeria · West Africa",serves:"4",e:"🍜",bg:"#FDEAEA",tag:"West Africa",
   ing:[{n:"Pepper soup spice mix",a:true},{n:"Catfish or goat meat",a:false},{n:"Scotch bonnet pepper",a:true},{n:"Uziza leaves (dried)",a:true},{n:"Ehuru (calabash nutmeg)",a:true},{n:"Crayfish (ground)",a:true},{n:"Maggi seasoning cubes",a:true},{n:"White onion",a:true},{n:"Scent leaves (efirin)",a:true}]}
];

function renderDishes(){
  var g=document.getElementById('dgrid');
  g.innerHTML=dishes.map(function(d,i){
    return '<div class="dcard" onclick="showDish('+i+')"><div class="dimg" style="background:'+d.bg+'">'+d.e+'</div><div class="dbdy"><div class="dn">'+d.name+'</div><div class="dorg">'+d.origin+'</div><span class="dtag">'+d.tag+'</span></div></div>';
  }).join('');
}

function showDish(i){
  var d=dishes[i];
  document.getElementById('idn').textContent=d.name;
  document.getElementById('ios').textContent=d.origin+' · Serves '+d.serves;
  document.getElementById('ilist').innerHTML=d.ing.map(function(ing){
    return '<div class="ii"><span class="iin">'+ing.n+'</span><span class="'+(ing.a?'instock':'nostock')+'">'+(ing.a?'&#x2713; In stock at our store':'&#x2715; Check availability — call us')+'</span></div>';
  }).join('');
  var panel=document.getElementById('ipanel');
  panel.classList.add('on');
  panel.scrollIntoView({behavior:'smooth',block:'nearest'});
}

function closeIng(){document.getElementById('ipanel').classList.remove('on');}

function srch(){
  var q=document.getElementById('dsrch').value.toLowerCase().trim();
  if(!q)return;
  var m=null;
  for(var i=0;i<dishes.length;i++){
    var d=dishes[i];
    if(d.name.toLowerCase().indexOf(q)>=0||d.origin.toLowerCase().indexOf(q)>=0){m=i;break;}
    for(var j=0;j<d.ing.length;j++){if(d.ing[j].n.toLowerCase().indexOf(q)>=0){m=i;break;}}
    if(m!==null)break;
  }
  document.getElementById('nores').style.display=m===null?'block':'none';
  if(m!==null)showDish(m);
}

/* ---- NAVIGATION ---- */
function go(id,btn){
  document.querySelectorAll('.page').forEach(function(p){p.classList.remove('on');});
  document.getElementById('p-'+id).classList.add('on');
  document.querySelectorAll('.nlinks button').forEach(function(b){b.classList.remove('act');});
  if(btn){btn.classList.add('act');}
  window.scrollTo(0,0);
}

/* ============================================================
   PRODUCT LIST — edit here to add / change / remove products.
   Each product:
     name    : product name
     cat     : grains | spices | meatfish | oils | produce | beans | drinks | snacks | beauty
     origin  : text under the name (country, etc.)
     emoji   : placeholder icon (used if no img)
     bg      : background colour behind the emoji
     img     : image URL or "images/file.jpg"  (leave "" to use emoji)
     tag     : "Popular" | "Hot" | "New" | "Staple" | ""  (the coloured label)
     desc    : short description shown in the pop-up
     sizes   : list of [label, price] — one or many. e.g. [["500g","8.49"],["1kg","15.99"]]
     stock   : true = in stock, false = sold out (greys it out)
   ============================================================ */
var PRODUCTS = [
 // ===== GRAINS & FLOUR (17) =====
  {name:"Clic White Corn Flour", cat:"grains", emoji:"🌽", bg:"#FFF3CC", img:"https://epiceriemultinationale.ca/wp-content/uploads/2024/12/Clic-Farine-De-Mais-Blanc-5kg.jpg", tag:"Staple",
    desc:"White corn flour for making fufu and other traditional dishes.",sizes:[["5kg","28.00"]], stock:true},
  {name:"Clic Couscous", cat:"grains", emoji:"🌾", bg:"#FFF3CC", img:"https://bfasset.costco-static.com/U447IH35/as/6f6ccmpq5qb3vc9vf9t35m7p/807599-894__1?auto=webp&format=jpg&width=1024&height=1024&fit=bounds&canvas=1024%2C1024", tag:"Staple",
    desc:"Couscous for salads, side dishes and main courses.",sizes:[["5kg","26.99"]], stock:true},
  {name:"Clic Durum Semolina", cat:"grains", emoji:"🌾", bg:"#FFF3CC", img:"https://gdx-assets.costco.com/adobe/assets/urn:aaid:aem:75d99fa6-a6e8-48a7-83aa-19bf21a512f7/as/1072573__1.avif?width=1024&height=1024&fit=contain", tag:"Staple",
    desc:"Durum semolina for pasta, couscous and baking.",sizes:[["10kg","34.99"]], stock:true},
  {name:"Gold King Wheatlets", cat:"grains", emoji:"🌾", bg:"#FFF3CC", img:"https://treasureafricanmarket.com/wp-content/uploads/2025/12/original-154.png", tag:"Staple",
    desc:"Wheatlets for porridge, baking and side dishes.",sizes:[["10kg","36.00"]], stock:true},
  {name:"Dunya Harvest Paraboiled Rice", cat:"grains", emoji:"🌾", bg:"#FFF3CC", img:"https://static.wixstatic.com/media/b1ce09_8afaf68958d94068a3f4cfd313429355~mv2.jpg/v1/fill/w_844,h_1056,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/b1ce09_8afaf68958d94068a3f4cfd313429355~mv2.jpg", tag:"Staple",
    desc:"Parboiled rice for a variety of dishes.",sizes:[["8kg","22.00"]], stock:true},
  {name:"Ola Ola Authentic Pounded Yam Flour", cat:"grains", emoji:"🌾", bg:"#FFF3CC", img:"https://foodbasketcanada.com/wp-content/uploads/2024/09/EDITED-FB-BIG-POUNDO.png", tag:"Staple",
    desc:"Authentic pounded yam flour for traditional dishes.",sizes:[["1.8kg","35.00"],["4.5kg","50.00"],["10kg","100.00"]], stock:true},
  {name:"Golden Starise Rice Parboiled Rice ", cat:"grains", emoji:"🌾", bg:"#FFF3CC", img:"https://nativelandmart.com/cdn/shop/files/Rice_Golden_Star.png?v=1769055512", tag:"Staple",
    desc:"Parboiled rice for a variety of dishes.",sizes:[["22kg","55.00"]], stock:true},
  {name:"Mama's Choice Pounded Yam Flour", cat:"grains", origin:"Nigeria", emoji:"🍚", bg:"#FFF3CC", img:"", tag:"Staple",
   desc:"Smooth pounded yam flour for a quick, authentic swallow.",
   sizes:[["Bag",""]], stock:true},
  {name:"Meme D'Afrique Fufu Flour (Fermented Cassava)", cat:"grains", origin:"West Africa", emoji:"🌿", bg:"#E8F5EC", img:"", tag:"Staple",
   desc:"Fermented cassava (foufou) flour for traditional swallow.",
   sizes:[["Bag",""]], stock:true},
  {name:"Egusi (Ground Melon Seed)", cat:"grains", origin:"Nigeria", emoji:"🫙", bg:"#FFF3CC", img:"images/egusi-ground.jpg", tag:"Hot",
   desc:"Freshly ground melon seeds for the classic egusi soup. May contain tree nuts.",
   sizes:[["230g","8.00"],["700g","18.00"]], stock:true},
  {name:"Chikwangue (Cassava Bread)", cat:"grains", origin:"Central Africa", emoji:"🍞", bg:"#E8F5EC", img:"images/chikwangue.jpg", tag:"New",
   desc:"Sous-vide cassava bread — a soft, traditional Central African staple.",
   sizes:[["500g","3.99"]], stock:true},
  {name:"Egusi (Whole Melon Seeds)", cat:"grains", origin:"Nigeria", emoji:"🫙", bg:"#FFF3CC", img:"images/egusi-seed.jpeg", tag:"Hot",
    desc:"Whole shelled melon seeds — grind fresh for thick, nutty egusi soup.", sizes:[["500g","15.00"]], stock:true},
  {name:"Yellow Garri", cat:"grains", origin:"Nigeria", emoji:"🌾", bg:"#FFF3CC", img:"images/dried-crayfish.jpg", tag:"Staple",
    desc:"Yellow (palm oil) cassava flakes for eba or soaking.", sizes:[["1.5kg","10.00"],["4kg","20.00"]], stock:true},
  {name:"White Garri", cat:"grains", origin:"Nigeria", emoji:"🌾", bg:"#FFF3CC", img:"images/white-garri.jpeg", tag:"Staple",
    desc:"White cassava flakes for eba or soaking. Light and slightly sour.", sizes:[["1.5kg","10.00"],["4kg","20.00"]], stock:true},
  {name:"Ijebu Garri (Cassava Flakes)", cat:"grains", origin:"Nigeria", emoji:"🌾", bg:"#FFF3CC", img:"images/ijebu-garri.jpeg", tag:"Staple",
   desc:"Authentic Ijebu-style cassava flakes for eba or soaking. Slightly sour and light.",
   sizes:[["1.5kg","10.00"],["4kg","20.00"]], stock:true},
  {name:"Plantain Flour", cat:"grains", origin:"Nigeria", emoji:"🍌", bg:"#FFF0E0", img:"images/plantain-flour.jpeg", tag:"Staple",
   desc:"100% natural green plantain flour — for a smooth swallow or for baking. Naturally rich in fibre and potassium.",
   sizes:[["1.8kg","12.00"],["4kg","25.00"]], stock:true},
  {name:"Tropiway Cocoyam Fufu Flour", cat:"grains", origin:"West Africa", emoji:"🥔", bg:"#FFF3CC", img:"https://foodbasketcanada.com/wp-content/uploads/2025/07/img_3686.png", tag:"Staple",
   desc:"Cocoyam (taro) flour for a smooth, traditional swallow. Naturally gluten-free.",
   sizes:[["680g","15.00"]], stock:true},
  {name:"Tropiway Plantain Fufu Flour", cat:"grains", origin:"West Africa", emoji:"🌿", bg:"#E8F5EC", img:"https://starfishmarket.ca/cdn/shop/files/1856.png?v=1690660528&width=1900", tag:"Staple",
   desc:"Plantain flour for a smooth, traditional swallow. Naturally gluten-free.",
   sizes:[["680g","15.00"]], stock:true},
  {name:"Grandios Pap (Maize Porridge)", cat:"grains", origin:"West Africa", emoji:"🌽", bg:"#FFF3CC", img:"https://shalomafricanfoods.ca/storage/2024/11/Grandios-Pap-Yellow-500g-580x580.jpg", tag:"Staple",
   desc:"Instant maize porridge for a quick, traditional breakfast. Just add water or milk.",
   sizes:[["500g","6.99"]], stock:true},
  {name:"Obra Sorghum FLour", cat:"grains", origin:"West Africa", emoji:"🌾", bg:"#FEF5E4", img:"images/sorghum-flour.jpeg", tag:"Staple",
   desc:"Sorghum flour for baking, porridge and traditional dishes. Gluten-free and high in nutrients.",
   sizes:[["1kg","6.50"]], stock:true},
  {name:"Amala (Yam Flour)", cat:"grains", origin:"Nigeria", emoji:"🌾", bg:"#FFF3CC", img:"images/amala.jpeg", tag:"Staple",
   desc:"Yam flour for making the traditional Nigerian swallow, Amala. Smooth and authentic.",
   sizes:[["1.5kg","12.00"],["4kg","25.00"]], stock:true},
  {name:"Nuden Poundo Flour (Pounded Yam)", cat:"grains", origin:"Nigeria", emoji:"🌾", bg:"#FFF3CC", img:"https://i.ebayimg.com/images/g/RvsAAOSwn49l652p/s-l1600.webp", tag:"Staple",
   desc:"Pounded yam flour for a quick and authentic swallow. Smooth texture.",
   sizes:[["2.2lb","55.00"]], stock:false},
  {name:"Obra Yellow Garri (Cassava Flakes)", cat:"grains", origin:"Nigeria", emoji:"🌾", bg:"#FFF3CC", img:"images/obra-yellow.jpeg", tag:"Staple",
   desc:"Yellow cassava flakes for eba or soaking. Slightly sour and light.",
   sizes:[["2.3kg","15.99"],["4.5kg", "26.99" ]], stock:true},
  {name:"Ayoola Poundo Yam Flour", cat:"grains", origin:"Nigeria", emoji:"🌾", bg:"#FFF3CC", img:"https://foodbasketcanada.com/wp-content/uploads/2025/12/img_2791.png", tag:"Staple",
   desc:"Pounded yam flour for a smooth and authentic swallow. Easy to prepare.",
   sizes:[["2.2lb","12.00"],["4lb","25.00"]], stock:true},
  {name:"African Dried Cassava Flakes(Abacha)", cat:"grains", origin:"Nigeria", emoji:"🌾", bg:"#FFF3CC", img:"images/abacha.jpeg", tag:"Staple",
   desc:"Dried cassava flakes for making Abacha, a traditional Nigerian salad. Light and easy to prepare.",
   sizes:[["50g","6.00"],["330g","19.99"]], stock:true},
  {name:"Excellent Chef Parboiled Rice", cat:"grains", origin:"West Africa", emoji:"🌾", bg:"#FFF3CC", img:"images/20kg-rice.jpeg", tag:"Staple",
   desc:"Parboiled rice for a variety of West African dishes. Long grain and fluffy. 20kg",
   sizes:[["20kg","50.00"],], stock:true},
    {name:"Home Fresh Hausa Koko Flour", cat:"grains", origin:"Ghana", emoji:"🌾", bg:"#E8F0FF", img:"images/hausa-koko-flour.jpg", tag:"New",
   desc:"Spiced millet flour for hausa koko — the classic West African breakfast porridge.",
   sizes:[["400g","7.99"]], stock:true},
  {name:"Home Fresh Banku (Maize & Cassava Mix)", cat:"grains", origin:"Ghana", emoji:"🌽", bg:"#E8F5EC", img:"images/banku-flour.jpg", tag:"Popular",
   desc:"Ready maize and cassava mix flour for smooth, tangy banku. Serve with okro stew, soup or grilled tilapia.",
   sizes:[["1kg","11.99"],["2.2kg","22.00"],["4.5kg (10lb)","45.00"]], stock:true},
  {name:"Home Fresh Kokonte (Cassava Flour)", cat:"grains", origin:"Ghana", emoji:"🌾", bg:"#FFF0E0", img:"images/kokonte-cassava-flour.jpg", tag:"New",
   desc:"Dried cassava flour for kokonte (face the wall) — a smooth, hearty swallow for groundnut and palm nut soup.",
   sizes:[["1kg","12.00"]], stock:true},
  {name:"Ayoola Potato Flour", cat:"grains", origin:"Nigeria", emoji:"🥔", bg:"#E8F5EC", img:"images/ayoola-potato-flour.jpg", tag:"Popular",
   desc:"Smooth potato swallow, ready in 5 minutes. A lighter alternative for soups and stews.",
   sizes:[["0.9kg (2lb)","15.99"]], stock:true},
  {name:"Honeywell Semolina", cat:"grains", origin:"Nigeria", emoji:"🌾", bg:"#E8F5EC", img:"images/honeywell-semolina.jpg", tag:"Staple",
   desc:"Vitamin A fortified semolina for a soft, classic semo swallow.",
   sizes:[["1.8kg","14.99"]], stock:true},
  {name:"ScotMaple Oat Flour", cat:"grains", origin:"100% natural", emoji:"🌾", bg:"#FFE8E7", img:"https://m.media-amazon.com/images/I/51wE07jvEML._AC_.jpg", tag:"New",
   desc:"100% natural oat flour, no preservatives or added flavour. For baking, porridge and a lighter swallow.",
   sizes:[["3kg (6.6lb)",""]], stock:true},
  {name:"Golden Penny Spaghetti", cat:"grains", origin:"Nigeria", emoji:"🍝", bg:"#FFE8E7", img:"https://www.agrohandlers.com/uploaded_files/product-pix/PR926-0671a3ae164074.png", tag:"Staple",
   desc:"Nigeria's favourite spaghetti — contains fibre and rich in protein. Perfect for jollof spaghetti.",
   sizes:[["500g",""]], stock:true},
  {name:"Antonio Amato Fusilli No. 114", cat:"grains", origin:"Italy", emoji:"🍝", bg:"#FFF3CC", img:"images/antonio-amato-fusilli.jpg", tag:"Staple",
   desc:"Italian durum wheat fusilli from Salerno. Cooks in 8 minutes.",
   sizes:[["500g",""]], stock:true},
  {name:"Mémé D'Afrique Fufu (Fermented Cassava)", cat:"grains", origin:"Côte d'Ivoire", emoji:"🌾", bg:"#E8F5EC", img:"images/meme-dafrique-fufu.jpg", tag:"Popular",
   desc:"Pure fermented cassava flour for smooth fufu. Gluten free and rich in minerals.",
   sizes:[["1kg (2.2lb)","10.00"]], stock:true},
  {name:"Obra Kokonte (Cassava Flour)", cat:"grains", origin:"Ghana", emoji:"🌾", bg:"#F3E8FF", img:"images/obra-kokonte.jpg", tag:"Staple",
   desc:"Large-format cassava flour for kokonte. Serve with groundnut or palm nut soup.",
   sizes:[["3.5kg",""]], stock:true},
  {name:"Indomie Instant Noodles – Chicken", cat:"grains", origin:"Nigeria", emoji:"🍜", bg:"#FFE8E7", img:"images/indomie-chicken.jpg", tag:"Popular",
   desc:"The classic chicken-flavour Indomie. Carton of 40 packs plus 2 free.",
   sizes:[["Carton (40+2)",""],["Single pack",""]], stock:true},
  {name:"Indomie Instant Noodles – Onion Chicken", cat:"grains", origin:"Nigeria", emoji:"🍜", bg:"#E8F5EC", img:"images/indomie-onion-chicken.jpg", tag:"Hot",
   desc:"Onion chicken flavour instant noodles with seasoning oil inside each pack.",
   sizes:[["70g single",""],["Carton",""]], stock:true},
  {name:"Clicano Ground Peanut Powder", cat:"grains", origin:"Packed in Laval, QC", emoji:"🥜", bg:"#FFF0E0", img:"images/ground-peanut-powder.jpg", tag:"Staple",
   desc:"100% ground white peanuts for groundnut soup, sauces and baking. Contains peanuts.",
   sizes:[["",""]], stock:true},
  {name:"Amala (Yam Flour)", cat:"grains", origin:"Nigeria", emoji:"🍠", bg:"#FEF5E4", img:"images/amala-yam-flour.jpg", tag:"Staple",
   desc:"100% natural yam flour for smooth, dark amala. Serve with ewedu, gbegiri or okra soup.",
   sizes:[["2.5kg",""]], stock:true},
  {name:"Okpa (Bambara Groundnut Flour)", cat:"grains", origin:"Nigeria", emoji:"🌾", bg:"#FFF3CC", img:"images/okpa-bambara-flour.jpg", tag:"Hot",
   desc:"100% bambara bean flour for okpa — no preservatives or chemicals. A great source of protein and carbohydrates.",
   sizes:[["5kg",""]], stock:true},
  {name:"Guinea Corn (Maïs de Guinée)", cat:"grains", origin:"Nigeria", emoji:"🌾", bg:"#FFF3CC", img:"images/guinea-corn.jpg", tag:"Staple",
   desc:"100% natural whole guinea corn (sorghum) for pap, porridge and traditional drinks. High in iron.",
   sizes:[["1.2lb",""]], stock:true},

 
  // ===== SPICES & SEASONING (40) =====
  {name:"Suya Spice Mix", cat:"spices", origin:"Nigeria", emoji:"🌶️", bg:"#FFF3CC", img:"", tag:"Popular",
   desc:"Authentic Northern Nigerian yaji blend — smoky, nutty and peppery. Perfect for grilled meat, chicken and skewers.",
   sizes:[["100g","3.49"],["200g","5.99"]], stock:true},
  {name:"Locust Beans (Iru)", cat:"spices", origin:"Nigeria", emoji:"🌿", bg:"#E8F5EC", img:"images/ogbono-whole.jpg", tag:"New",
   desc:"Fermented locust beans that give soups like egusi and ewedu their signature umami depth.",
   sizes:[["100g","3.49"]], stock:true},
  {name:"Maggi Seasoning Cubes", cat:"spices", origin:"West Africa", emoji:"🧂", bg:"#FFE8D6", img:"", tag:"Popular",
   desc:"The seasoning cube found in every West African kitchen. Adds savoury depth to any dish.",
   sizes:[["50 cubes","2.99"],["100 cubes","4.99"]], stock:true},
  {name:"Ogiri (Fermented Locust)", cat:"spices", origin:"Nigeria", emoji:"🍃", bg:"#E8F5EC", img:"", tag:"Popular",
   desc:"Traditional fermented seasoning that brings authentic depth to native soups.",
   sizes:[["50g","2.99"]], stock:false},
  {name:"Ducros Thyme", cat:"spices", origin:"West Africa", emoji:"🌿", bg:"#E8F5EC", img:"https://www.ugonwas.ca/wp-content/uploads/2021/11/Ducros-Dried-Thyme-front.jpg", tag:"Staple",
   desc:"Dried thyme leaves for seasoning soups, stews and sauces.",
   sizes:[["10g","3.00"],["10g x 12","36.00"]], stock:true},
  {name:"Ducros Curry Powder", cat:"spices", origin:"West Africa", emoji:"🌶️", bg:"#FFE8E7", img:"https://solarben.com.au/wp-content/uploads/2022/08/Ducro-curry-powder_10g-Pack-of-12.jpeg", tag:"Popular",
   desc:"A fragrant blend of spices for curries, soups and stews.",
   sizes:[["10g","3.00"],["10g x 12","36.00"]], stock:true},
  {name:"sunspun thyme leaves", cat:"spices", emoji:"🌿", bg:"#E8F5EC", img:"https://digital.loblaws.ca/PCX/20164435_EA/en/1/20164435_en_front_400.png", tag:"Staple",
   sizes:[["230g","3.50"]], stock:true},
  {name:"sunspun bay leaves", cat:"spices", emoji:"🌿", bg:"#E8F5EC", img:"https://www.instacart.com/image-server/932x932/filters:fill(FFF,true):format(webp)/www.instacart.com/assets/domains/product-image/file/large_b88bddac-2b47-4d4e-bc78-28a61df15a12.png", tag:"Staple",
   sizes:[["60g","8.99"]], stock:true},
  {name:"sunspun ginger powder", cat:"spices", emoji:"🌿", bg:"#E8F5EC", img:"https://digital.loblaws.ca/PCX/20087955_EA/en/1/20087955_en_front_400.png", tag:"Staple",
   sizes:[["350g","13.99"]], stock:true},
  {name:"Moulin Rouge ground nutmeg", cat:"spices", emoji:"🌿", bg:"#E8F5EC", img:"https://gdx-assets.costco.com/adobe/assets/urn:aaid:aem:a174e53f-1fe9-4276-b441-d69936664c6c/as/1300892__1.avif?width=727&height=727&fit=contain", tag:"Staple",
    sizes:[["455g","2.49"]], stock:true},
  {name:"Rosehill Taco & fajitas seasoning", cat:"spices", emoji:"🌿", bg:"#E8F5EC", img:"https://www.aubut.ca/pictures/products/large/13769_taco-and-fajitas-seasonning.webp", tag:"Staple",
    sizes:[["450g","13.99"]], stock:true},
  {name:"Rosehill Italian Delight", cat:"spices", emoji:"🌿", bg:"#E8F5EC", img:"https://m.media-amazon.com/images/I/611-cgdbfDL._AC_SY879_.jpg", tag:"Staple",
    sizes:[["550g","13.99"]], stock:true},
  {name:"Rosehill FavoRiz assorted seasoning", cat:"spices", emoji:"🌿", bg:"#E8F5EC", img:"https://gdx-assets.costco.com/adobe/assets/urn:aaid:aem:58ea9689-84a7-40fc-bed4-6bffe8195f61/as/89783__1.avif?width=727&height=727&fit=contain", tag:"Staple",
    desc:"Seasoning for rice, potatoes and soups",sizes:[["375g","12.00"]], stock:true},
  {name:"Herbamare Organic Herbed Sea Salt", cat:"spices", emoji:"🌿", bg:"#E8F5EC", img:"https://canada.ambrosia.ca/cdn/shop/files/herbamare-original-organic-herbed-sea-salt-254615_2048x_db2d3ab7-0f74-4410-9fcd-7281bf1907e9.webp?v=1686746613&width=1200", tag:"Staple",
    desc:"Organic sea salt blended with herbs and vegetables for seasoning.",sizes:[["250g","16.99"]], stock:true},
  {name:"Tiger Thyme Leaves", cat:"spices", emoji:"🌿", bg:"#E8F5EC", img:"https://thelabelstores.com/files/uploads/2025/07/Tiger-Thyme.jpg", tag:"Staple",
    desc:"Dried thyme leaves for seasoning soups, stews and sauces.",sizes:[["40g","3.50"]], stock:true},
  {name:"Tiger Curry Powder", cat:"spices", emoji:"🌶️", bg:"#FFE8E7", img:"https://m.media-amazon.com/images/I/81wnKR6DEfL._SX679_.jpg", tag:"Staple",
    desc:"A fragrant blend of spices for curries, soups and stews.",sizes:[["40g","3.50"]], stock:false},
  {name:"Knorr Chicken Broth Mix", cat:"spices", emoji:"🌿", bg:"#E8F5EC", img:"https://www.unileverfoodsolutions.ca/dam/global-ufs/mcos/NAM/calcmenu/products/CA-products/packshots/knorr/knorr-professional-chicken-broth-mix-6-x-1-kg/063350605233%20KCP%202023.png", tag:"Staple",
    desc:"Chicken broth mix for soups, stews and sauces.",sizes:[["1kg","14.00"]], stock:true},
  {name:"Moulin Rouge Cinnamon Sticks", cat:"spices", emoji:"🌿", bg:"#E8F5EC", img:"https://gdx-assets.costco.com/adobe/assets/urn:aaid:aem:d40d6c94-e36c-409e-95e2-504486bf2f88/as/1964339__1.avif?width=727&height=727&fit=contain", tag:"Staple",
    desc:"Cinnamon sticks for baking, cooking and beverages.",sizes:[["700g","3.50"]], stock:true},
  {name:"Moulin Rouge Oregano Leaves", cat:"spices", emoji:"🌿", bg:"#E8F5EC", img:"https://gdx-assets.costco.com/adobe/assets/urn:aaid:aem:cee84822-f590-42d2-adb4-a6e075f68c42/as/1129348__1.avif?width=727&height=727&fit=contain", tag:"Staple",
    desc:"Whole cloves for baking, cooking and beverages.",sizes:[["600g","3.50"]], stock:true},
  {name:"Moulin Rouge Ground Cinnamon", cat:"spices", emoji:"🌿", bg:"#E8F5EC", img:"https://gdx-assets.costco.com/adobe/assets/urn:aaid:aem:13bc0d9b-48e7-4074-91f7-79ddae407434/as/1601015__1.avif?width=727&height=727&fit=contain", tag:"Staple",
    desc:"Whole cloves for baking, cooking and beverages.",sizes:[["1.6kg","3.50"]], stock:true},
  {name:"Moulin Rouge Parsley Leaves", cat:"spices", emoji:"🌿", bg:"#E8F5EC", img:"https://gdx-assets.costco.com/adobe/assets/urn:aaid:aem:c0d7138d-ec97-4192-92d6-f4b3ab8bb229/as/1129355__1.avif?width=727&height=727&fit=contain", tag:"Staple",
    desc:"Whole cloves for baking, cooking and beverages.",sizes:[["400g","3.50"]], stock:true},
  {name:"Moulin Rouge Bay Leaves", cat:"spices", emoji:"🌿", bg:"#E8F5EC", img:"https://gdx-assets.costco.com/adobe/assets/urn:aaid:aem:70922075-f18c-4fe0-8b5b-f05cbb61c548/as/1128948__1.avif?width=1024&height=1024&fit=contain", tag:"Staple",
    desc:"Whole cloves for baking, cooking and beverages.",sizes:[["250g","3.50"]], stock:true},
  {name:"Moulin Rouge Rosemary Leaves", cat:"spices", emoji:"🌿", bg:"#E8F5EC", img:"https://gdx-assets.costco.com/adobe/assets/urn:aaid:aem:69cc8a1e-44b5-4584-b81b-a044c73ac8ab/as/1129352__1.avif?width=727&height=727&fit=contain", tag:"Staple",
    desc:"Whole cloves for baking, cooking and beverages.",sizes:[["1.1kg","3.50"]], stock:true},
  {name:"Maggi Przyprawa w Plyne", cat:"spices", emoji:"🌿", bg:"#E8F5EC", img:"https://i5.walmartimages.com/seo/Maggi-Przyprawa-w-Plynie-Liquid-Seasoning-960g-33-9oz_c0716001-47fd-46eb-8b92-d3e5d0e7c024.36d220aceb8de0891e7bb8eb57d88442.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", tag:"Staple",
    desc:"Liquid seasoning for soups, stews and sauces.",sizes:[["960g","3.00"]], stock:true},
  {name:"Kosher Salt", cat:"spices", emoji:"🧂", bg:"#FFF3CC", img:"https://bfasset.costco-static.com/U447IH35/as/6r3m3wbgwcj5wp6542snqjf/136563-894__1?auto=webp&format=jpg&width=1024&height=1024&fit=bounds&canvas=1024%2C1024", tag:"Staple",
    desc:"Salt for seasoning and preserving food.",sizes:[["750g","2.00"]], stock:true},
  {name:"Benny Instant Stock Powder (Chicken)", cat:"spices", origin:"West Africa", emoji:"🍗", bg:"#FFF3CC", img:"https://morielsoasis.ca/cdn/shop/files/Screenshot-20240712-233116.png?v=1720849138&width=1426", tag:"Popular", 
  desc:"Chicken-flavoured instant stock powder for soups, stews, rice and vegetables. 1 sachet = 2 stock cubes.",
   sizes:[["42 sachets",""]], stock:true},
  {name:"Maggi Chicken Flavour Seasoning", cat:"spices", origin:"West Africa", emoji:"🧂", bg:"#FFF3CC", img:"https://www.madewithnestle.ca/content/dam/nestlecanadaincprogram/maggi/en/products/nestle_product_maggie-01-chicked.png", tag:"Popular",
   desc:"The classic chicken seasoning tablet — adds savoury depth to any dish.",
   sizes:[["600g",""]], stock:true},
  {name:"Maggi Crayfish Seasoning", cat:"spices", origin:"West Africa", emoji:"🦐", bg:"#FFE8E7", img:"https://stermart.com/wp-content/uploads/2024/12/75EFE4A7-7B48-401E-ACC5-E6B08F20E18E.jpg", tag:"Hot",
   desc:"Crayfish-flavoured seasoning for authentic Nigerian soups and stews.",
   sizes:[["600g",""]], stock:true},
  {name:"SpiCity Fried Rice Seasoning", cat:"spices", origin:"Nigeria", emoji:"🍚", bg:"#E8F5EC", img:"https://foodbasketcanada.com/wp-content/uploads/2024/07/spice-and-condiments_0008_spicity-fried-rice-spice-jpg.webp", tag:"Popular",
   desc:"Seasoning powder blend made for perfect Nigerian-style fried rice.",
   sizes:[["100g",""]], stock:true},
  {name:"Gino Asun Flavoured Seasoning Cubes", cat:"spices", origin:"Nigeria", emoji:"🌶️", bg:"#FFE8D6", img:"https://foodbasketcanada.com/wp-content/uploads/2026/04/Asun-cubes.png", tag:"Popular",
   desc:"Spicy asun-flavoured seasoning cubes for grilled meat, pepper soup and stews.",
   sizes:[["50 cubes",""]], stock:true},
  {name:"Knorr Chicken Seasoning Cubes", cat:"spices", origin:"West Africa", emoji:"🧂", bg:"#E8F5EC", img:"https://shalomafricanfoods.ca/storage/2024/11/knorr-Chicken-Cubes-320g-580x580.jpg", tag:"Popular",
   desc:"Chicken seasoning cubes fortified with iron and iodine.",
   sizes:[["45 x 8g",""]], stock:true},
  {name:"Maggi Star Seasoning Cubes", cat:"spices", origin:"West Africa", emoji:"🧂", bg:"#FFF3CC", img:"https://i0.wp.com/africaribana.com/wp-content/uploads/2023/09/1623080898_81-jpg.webp?w=500&ssl=1", tag:"Staple",
   desc:"All-purpose seasoning cubes, a source of iron and iodine.",
   sizes:[["100 cubes (400g)",""]], stock:true},
  {name:"White Pepper (Poivre Blanc)", cat:"spices", origin:"", emoji:"🌶️", bg:"#E8F5EC", img:"https://www.slofoodgroup.com/cdn/shop/products/white-peppercorns-sri-lanka-spices-slofoodgroup-4-oz-911403_800x.jpg?v=1762439518", tag:"Staple",
   desc:"100% natural ground white pepper.",
   sizes:[["100g",""]], stock:true},
  {name:"Cameroon Pepper (Ground)", cat:"spices", origin:"Cameroon", emoji:"🌶️", bg:"#FFE8E7", img:"images/cameroon-pepper.jpg", tag:"Hot",
   desc:"Fiery ground Cameroon pepper — a little goes a long way.",
   sizes:[["190g",""],["285g",""]], stock:true},
  {name:"African Red Pepper (Ground)", cat:"spices", origin:"Nigeria", emoji:"🌶️", bg:"#FFE8D6", img:"images/african-red-pepper.jpg", tag:"Popular",
   desc:"Ground African red pepper for stews, soups and pepper sauces.",
   sizes:[["190g",""],["285g",""]], stock:true},
  {name:"Ukpaka (Ugba / Oil Bean Seed)", cat:"spices", origin:"Nigeria", emoji:"🌿", bg:"#E8F5EC", img:"images/ukpaka.jpg", tag:"New",
   desc:"Sliced fermented oil bean seeds for ugba, abacha and native salads. May contain tree nuts.",
   sizes:[["100g",""]], stock:true},
  {name:"Crayfish (Ground)", cat:"spices", origin:"West Africa", emoji:"🦐", bg:"#FFE8E7", img:"images/ground-crayfish.jpg", tag:"Popular",
    desc:"Ground dried crayfish — a savoury base for soups, stews and sauces.", sizes:[["200g","6.00"]], stock:true},
  {name:"Dried Crayfish (Whole)", cat:"spices", origin:"West Africa", emoji:"🦐", bg:"#FFE8E7", img:"images/dried-crayfish.jpg", tag:"Staple",
    desc:"Whole dried crayfish — pound or blend for soups and stews.", sizes:[["200g","6.00"]], stock:true},
  {name:"Okpie (African Black Pepper)", cat:"spices", origin:"Nigeria", emoji:"🌶️", bg:"#FFE8E7", img:"images/okpie.jpeg", tag:"Hot",
    desc:"Ground African black pepper for soups, stews and sauces.", sizes:[["110g x 2","6.00"]], stock:true},
  {name:"Suya Pepper (Piment Suya)", cat:"spices", origin:"Nigeria", emoji:"🌶️", bg:"#FFE8E7", img:"images/suya-pepper.jpg", tag:"Hot",
   desc:"Ready-mixed suya pepper for grilled meat, skewers and asun. May contain peanuts.",
   sizes:[["135g",""]], stock:true},
  {name:"Achi (Thickener Powder)", cat:"spices", origin:"Nigeria", emoji:"🥣", bg:"#FEF5E4", img:"images/achi-thickener.jpg", tag:"Staple",
   desc:"Ground achi seed — thickens oha, egusi and native soups without changing the flavour.",
   sizes:[["170g",""]], stock:true},
  {name:"Banga Spice", cat:"spices", origin:"Nigeria", emoji:"🌿", bg:"#FEF5E4", img:"images/banga-spice.jpg", tag:"Popular",
   desc:"Traditional banga spice blend (aidan fruit, ataiko, irugeje, oburunbebe, beletete) for banga soup and ofe akwu.",
   sizes:[["980g",""]], stock:true},

  // ===== MEAT & FISH (8) =====
  {name:"Smoked Catfish", cat:"meatfish", origin:"West Africa", emoji:"🐟", bg:"#FFE8E7", img:"", tag:"Hot",
   desc:"Traditionally smoked catfish, ready for egusi, pepper soup and stews. Rich, deep flavour.",
   sizes:[["500g","12.49"]], stock:true},
  {name:"Dried Stockfish", cat:"meatfish", origin:"West Africa", emoji:"🐟", bg:"#F0F8FF", img:"", tag:"New",
   desc:"Premium dried stockfish for soups and stews. Soak before use for a tender, flavourful result.",
   sizes:[["300g","9.99"]], stock:true},
  {name:"Titus Sardines in Soybean Oil and chili pepper", cat:"meatfish", emoji:"🐟", bg:"#FFE8E7", img:"https://coolrunningsfoods.ca/cdn/shop/products/Sardines-In-Chili-Pepper_1500x.jpg?v=1630696697", tag:"Staple",
    desc:"Titus sardines packed in soybean oil, a convenient source of protein.",sizes:[["125g","2.00"]], stock:true},
  {name:"Titus Sardines in Soybean Oil", cat:"meatfish", emoji:"🐟", bg:"#FFE8E7", img:"https://coolrunningsfoods.ca/cdn/shop/products/Sardines-In-Soybean-oil_1500x.jpg?v=1630696885", tag:"Staple",
    desc:"Titus sardines packed in soybean oil, a convenient source of protein.",sizes:[["125g","2.00"]], stock:true},
  {name:"The Orignal Exeter Corned Beef", cat:"meatfish", emoji:"🥩", bg:"#FFE8E7", img:"https://shalomafricanfoods.ca/storage/2025/01/5907.jpg", tag:"Staple",
    desc:"Premium corned beef, perfect for sandwiches and stews.",sizes:[["340g","9.99"]], stock:true},
  {name:"Geisha Brand Jack Mackerel Chili Hot & Spicy", cat:"meatfish", emoji:"🐟", bg:"#FFE8E7", img:"https://images.cdn.saveonfoods.com/detail/00842395002210.jpg", tag:"Staple",
    desc:"Spicy jack mackerel in chili sauce, perfect for adding heat to your meals.",sizes:[["425g","4.99"]], stock:true},
  {name:"Geisha Brand Jack Mackerel in Tomato Sauce", cat:"meatfish", emoji:"🐟", bg:"#FFE8E7", img:"https://starfishmarket.ca/cdn/shop/files/1796.png?v=1690651397&width=1900", tag:"Staple",
    desc:"Jack mackerel in rich tomato sauce, perfect for sandwiches and stews.",sizes:[["425g","4.99"]], stock:true},
  {name:"Kirland seasoned chunk chicken breast", cat:"meatfish", emoji:"🍗", bg:"#FFE8E7", img:"https://washingtoncommunitymarket.ca/cdn/shop/products/Chickenbreast_1370x.jpg?v=1628617621", tag:"Staple",
    desc:"Seasoned chunk chicken breast, perfect for quick meals.",sizes:[["196g","12.99"]], stock:true},
  {name:"Frozen Hard Chicken", cat:"meatfish", origin:"Packed in Ottawa", emoji:"🍗", bg:"#FFE8E7", img:"images/frozen-hard-chicken.jpg", tag:"Popular",
   desc:"Whole hard chicken (poulet dur) — firm, full-flavoured bird for pepper soup, stews and jollof. Keep frozen.",
   sizes:[["1.33kg",""]], stock:true},
  {name:"Frozen Cow Meat", cat:"meatfish", origin:"Packed in Ottawa", emoji:"🥩", bg:"#FFE8E7", img:"images/frozen-cow-meat.jpg", tag:"Staple",
   desc:"Bone-in cow meat cut for stews, pepper soup and party rice. Keep frozen.",
   sizes:[["0.7kg",""]], stock:true},
  {name:"Frozen Goat Meat", cat:"meatfish", origin:"Packed in Ottawa", emoji:"🐐", bg:"#FFE8E7", img:"images/frozen-goat-meat.jpg", tag:"Popular",
   desc:"Bone-in goat meat for goat pepper soup, nkwobi and stews. Keep frozen.",
   sizes:[["0.7kg",""]], stock:true},
  {name:"Frozen Cow Skin (Kpomo)", cat:"meatfish", origin:"Packed in Ottawa", emoji:"🥩", bg:"#FEF5E4", img:"images/frozen-cow-skin-kpomo.jpg", tag:"Hot",
   desc:"Cleaned cow skin (kpomo/ponmo) — soft and chewy in soups, stews and nkwobi. Keep frozen.",
   sizes:[["0.7kg",""]], stock:true},
  {name:"Kirkland Cooked Shrimp (Tail-On)", cat:"meatfish", origin:"Farm-raised", emoji:"🍤", bg:"#FFE8E7", img:"images/cooked-shrimp.jpg", tag:"Staple",
   desc:"Peeled, deveined, tail-on cooked shrimp — 31-40 count. Ready to thaw and use. Keep frozen.",
   sizes:[["454g (1 lb)",""]], stock:true},
  {name:"Stock Fish Flex", cat:"meatfish", origin:"Nigeria", emoji:"🐟", bg:"#F0F8FF", img:"images/stock-fish-flex.jpg", tag:"Hot",
   desc:"Soft, flexible dried stockfish pieces — no soaking needed. Adds deep flavour to egusi, oha and native soups.",
   sizes:[["195g","20.00"]], stock:true},
  {name:"Frozen Washed Beans", cat:"beans", origin:"Frozen · approx. 0.86kg", emoji:"🫘", bg:"#FEF5E4", img:"images/frozen-washed-beans.jpg", tag:"Popular",
   desc:"Peeled, washed beans ready to blend — skip the hours of peeling for moi moi and akara.",
   sizes:[["",""]], stock:true},
  {name:"Frozen Turkey Gizzard", cat:"meatfish", origin:"Frozen · approx. 0.66kg", emoji:"🦃", bg:"#FFE8D6", img:"images/frozen-turkey-gizzard.jpg", tag:"Popular",
   desc:"Cleaned turkey gizzards — great for peppered gizzard, gizdodo, and rich stews.",
   sizes:[["",""]], stock:true},
  {name:"Frozen Sharki (Towel Tripe)", cat:"meatfish", origin:"Frozen · approx. 0.7kg", emoji:"🥩", bg:"#FDEAEA", img:"images/frozen-sharki-towel-tripe.jpg", tag:"New",
   desc:"Honeycomb towel tripe (shaki) — a classic in pepper soup and assorted-meat stews.",
   sizes:[["",""]], stock:true},
  {name:"Periwinkle", cat:"meatfish", origin:"Frozen · naturally sourced", emoji:"🐌", bg:"#E8F5EC", img:"images/periwinkle.jpg", tag:"Hot",
   desc:"Naturally sourced periwinkles (isam) — a favourite in Edikaikong and seafood okro.",
   sizes:[["",""]], stock:true},
  {name:"Frozen Croaker Fish", cat:"meatfish", origin:"Frozen · approx. 1.92kg", emoji:"🐟", bg:"#E8F0FF", img:"images/frozen-croaker-fish.jpg", tag:"Staple",
   desc:"Whole frozen croaker — firm and flavourful, ideal for fish stew, grilling, or peppered fish.",
   sizes:[["",""]], stock:true},
  {name:"Frozen Mackerel", cat:"meatfish", origin:"Frozen · approx. 1.8kg", emoji:"🐟", bg:"#E8F0FF", img:"images/frozen-mackerel.jpg", tag:"Staple",
   desc:"Whole frozen mackerel (titus) — perfect for grilling, frying, or fish stew.",
   sizes:[["",""]], stock:true},
  {name:"Sole Flat Fish", cat:"meatfish", origin:"Frozen · approx. 1.2kg", emoji:"🐟", bg:"#E8F0FF", img:"images/sole-flat-fish.jpg", tag:"New",
   desc:"Whole frozen sole — mild and tender, great fried or in a light stew.",
   sizes:[["",""]], stock:true},
  {name:"Green Ocean Wild Pacific Pink Salmon Portions", cat:"meatfish", origin:"Wild-caught · 800g", emoji:"🐟", bg:"#FFE8D6", img:"images/pink-salmon-portions.jpg", tag:"New",
   desc:"Boneless, skin-on wild Pacific pink salmon portions. MSC certified, approx. 5–9 portions per bag.",
   sizes:[["800g",""]], stock:true},
  {name:"Frozen Nigerian Turkey", cat:"meatfish", origin:"Frozen · approx. 0.79kg", emoji:"🦃", bg:"#FFE8D6", img:"images/frozen-nigerian-turkey.jpg", tag:"Hot",
   desc:"Nigerian-style hard turkey pieces — deep flavour for stews, peppered turkey, and party jollof.",
   sizes:[["",""]], stock:true},
  {name:"Frozen Tilapia Fish", cat:"meatfish", origin:"Frozen · approx. 0.66kg", emoji:"🐟", bg:"#E8F0FF", img:"images/frozen-tilapia-fish.jpg", tag:"Staple",
   desc:"Whole frozen tilapia — an everyday fish for stews, grilling, or frying.",
   sizes:[["",""]], stock:true},
  {name:"Frozen Cow Feet", cat:"meatfish", origin:"Frozen · approx. 0.84kg", emoji:"🐄", bg:"#FDEAEA", img:"images/frozen-cow-feet.jpg", tag:"Popular",
   desc:"Cleaned cow feet (bokoto) — rich in gelatin for pepper soup, nkwobi, and cow-leg stew.",
   sizes:[["",""]], stock:true},
  {name:"Frozen Chicken Gizzard", cat:"meatfish", origin:"Frozen · approx. 0.68kg", emoji:"🐔", bg:"#FDEAEA", img:"images/frozen-chicken-gizzard.jpg", tag:"Popular",
   desc:"Cleaned chicken gizzards for peppered gizzard, gizdodo, and stews.",
   sizes:[["",""]], stock:true},
  {name:"Frozen Sardine", cat:"meatfish", origin:"Frozen · approx. 1.73kg", emoji:"🐟", bg:"#E8F0FF", img:"images/frozen-sardine.jpg", tag:"Staple",
   desc:"Whole frozen sardines — oily and flavourful, great grilled or fried.",
   sizes:[["",""]], stock:true},
  {name:"Frozen Whiting Fish", cat:"meatfish", origin:"Frozen · approx. 1.8kg", emoji:"🐟", bg:"#E8F0FF", img:"images/frozen-whiting-fish.jpg", tag:"Staple",
   desc:"Whole frozen whiting — mild white fish that fries up beautifully; a fish-stew staple.",
   sizes:[["",""]], stock:true},



  // ===== OILS & SAUCES (13) =====
  {name:"Red Palm Oil", cat:"oils", origin:"Ghana", emoji:"🫙", bg:"#FFF3CC", img:"", tag:"Popular",
   desc:"Unrefined red palm oil with a rich colour and authentic taste. Essential for jollof, soups and stews.",
   sizes:[["1L","8.99"],["2L","15.99"],["5L","34.99"]], stock:true},
  {name:"Groundnut Paste", cat:"oils", origin:"Nigeria", emoji:"🥜", bg:"#FFF0E0", img:"", tag:"Popular",
   desc:"Pure roasted groundnut (peanut) paste for suya, groundnut soup and snacks.",
   sizes:[["350g","6.29"]], stock:true},
  {name:"Mama Bea's Shitor Sauce", cat:"oils", origin:"Ghana", emoji:"🫙", bg:"#FFF0E0", img:"https://smkafricanfoods.com/wp-content/uploads/2024/12/shitorthe-most-convenient-way-to-get-your-african-caribbean-groceries-in-canada-the-us-302870.jpg", tag:"Hot",
   desc:"Spicy Ghanaian hot sauce made with smoked fish, peppers and spices. Perfect for rice, fish and chicken.",
   sizes:[["250ml","6.99"]],stock:true},
  {name:"Somme Tomato Paste", cat:"oils", emoji:"🍅", bg:"#FFE8E7", img:"https://morielsoasis.ca/cdn/shop/files/rn-image_picker_lib_temp_866ea346-1f35-4a9c-ac8d-d2572ec6add7.jpg?v=1762709822&width=1646", tag:"Staple",
    desc:"Rich tomato paste for soups, stews and sauces.",sizes:[["210g","2.50"],["400g","4.00"]], stock:true},
  {name:"De Rica Tomato Paste 28%", cat:"oils", emoji:"🍅", bg:"#FFE8E7", img:"https://www.surulerefoods.com/cdn/shop/files/1722465203191795.jpg?v=1756450297", tag:"Staple",
    desc:"Rich tomato paste for soups, stews and sauces.",sizes:[["190ml","3.50"]], stock:true},
  {name:"De Rica Tomato Paste", cat:"oils", emoji:"🍅", bg:"#FFE8E7", img:"https://www.surulerefoods.com/cdn/shop/files/1722465203191795.jpg?v=1756450297", tag:"Staple",
    desc:"Rich tomato paste for soups, stews and sauces.",sizes:[["800ml","9.50"]], stock:true},
  {name:"Kirkland Organic Tomato Sauce", cat:"oils", emoji:"🍅", bg:"#FFE8E7", img:"https://bfasset.costco-static.com/U447IH35/as/75vpksw6724k39qh7gbpz59/405355-894__4?auto=webp&format=jpg&width=727&height=727&fit=bounds&canvas=727%2C727", tag:"Staple",
    desc:"Organic tomato sauce for soups, stews and sauces.",sizes:[["398ml","4.99"]], stock:true},
  {name:"Heinz Tomato Ketchup", cat:"oils", emoji:"🍅", bg:"#FFE8E7", img:"https://res.cloudinary.com/kraft-heinz-whats-cooking-ca/image/upload/f_auto/q_auto/c_limit,w_1920/v1/dxp-images/heinz/products/00013000006408-tomato-ketchup/marketing-view-color-front_content-hub-13506006_39892ed4c5dc1f2fd1b8cdf1142d7edc?_a=BAVMn6ID0", tag:"Staple",
    desc:"Classic tomato ketchup for burgers, fries and sandwiches.",sizes:[["1.25l","9.99"]], stock:true},
  {name:"Stoney Creak No salt Tomato Paste", cat:"oils", emoji:"🍅", bg:"#FFE8E7", img:"https://www.stoneycreekbrand.com/images/crushed-nosalt-eng.png", tag:"Staple",
    desc:"No salt added tomato paste for soups, stews and sauces.",sizes:[["2.84l","17.99"]], stock:true},
  {name:"Praise Abemudro Palm Cream with Herbs", cat:"oils",origin:"Ghana", emoji:"🫙", bg:"#FFF0E0", img:"https://mama-t.de/cdn/shop/products/MJ9A8055.jpg?v=1642614310", tag:"Staple",
    desc:"Palm cream with herbs for soups, stews and sauces.",sizes:[["400g","4.50"],["800g","9.50"]], stock:true},
  {name:"Precious Palmnut Cream Concentrate", cat:"oils",origin:"Ghana", emoji:"🫙", bg:"#FFF0E0", img:"https://obraafricanfoods.ca/wp-content/uploads/2024/02/10.png", tag:"Staple",
    desc:"Palmnut cream concentrate for soups, stews and sauces.",sizes:[["800g","9.50"]], stock:true},
  {name:"Gino Pepper & Onion Tomato Seasoning Mix", cat:"oils", origin:"Nigeria", emoji:"🍅", bg:"#FFE8E7", img:"https://mile12african.ca/cdn/shop/files/ginopeppe.png?v=1721075792&width=800", tag:"Popular",
   desc:"Tomato seasoning mix enriched with pepper and onion. Great for stews and jollof.",
   sizes:[["Sachet",""]], stock:true},
  {name:"Gino Party Jollof Tomato Seasoning Mix", cat:"oils", origin:"Nigeria", emoji:"🍅", bg:"#FFE8E7", img:"https://africansupermarket.ca/wp-content/uploads/2024/10/8-scaled.png", tag:"Popular",
   desc:"Tomato seasoning mix made for that authentic party jollof flavour.",
   sizes:[["Sachet",""]], stock:true},
  {name:"Banga Red Palm Oil (Okomu)", cat:"oils", origin:"Nigeria", emoji:"🌴", bg:"#FFF0E0", img:"images/banga-red-palm-oil.jpeg", tag:"Popular",
   desc:"Unrefined red palm oil pressed from palm fruits — cholesterol-free. Essential for banga, soups, stews and jollof.",
   sizes:[["2L","16.00"]], stock:true},
  {name:"JUDAF Peanut Paste (Pâte d'Arachide)", cat:"oils", origin:"Nigeria", emoji:"🥜", bg:"#FFF0E0", img:"images/peanut-paste.jpg", tag:"Popular",
   desc:"Pure 100% peanut paste — for groundnut soup, suya, sauces and spreads. Store in a cool, dry place.",
   sizes:[["500g","12.00"]], stock:true},
  {name:"Kahraman Extra Virgin Olive Oil", cat:"oils", origin:"First cold press", emoji:"🫒", bg:"#E8F5EC", img:"images/kahraman-olive-oil.jpg", tag:"Staple",
   desc:"All-natural first cold press extra virgin olive oil. No cholesterol.",
   sizes:[["750ml","13.99"]], stock:true},
  {name:"Bleached Palm Oil", cat:"oils", origin:"Nigeria", emoji:"🫙", bg:"#FFF0E0", img:"images/bleached-palm-oil.jpg", tag:"Staple",
   desc:"Ready-bleached palm oil — skip the bleaching step for ofada stew, asun and peppered dishes.",
   sizes:[["2.5L",""]], stock:true},
 
  // ===== FRESH PRODUCE (2) =====
  {name:"Ripe Plantain", cat:"produce", origin:"Fresh · per pound", emoji:"🍌", bg:"#FFF0E0", img:"https://morielsoasis.ca/cdn/shop/files/Plantains.png?v=1712682106&width=1646", tag:"Hot",
   desc:"Sweet ripe plantain, great for frying dodo or boiling. Delivered fresh weekly.",
   sizes:[["Per pound","2.50"]], stock:true},
  {name:"Unripe Plantain (Green)", cat:"produce", origin:"Fresh · per pound", emoji:"🍌", bg:"#FEF5E4", img:"https://www.seriouseats.com/thmb/Uf9xCFgjnRu9wpff81o9dMUHJVM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2018__03__20180305-braised-plantains-vicky-wasik-1-1500x1125-5f814cfd3d7c476292334fa630eeacd0.jpg", tag:"New",
   desc:"Firm green plantain for boiling, roasting (bole) or unripe plantain flour.",
   sizes:[["Per pound","2.5"]], stock:true},
  {name:"Naija Bites Air Dehydrated Scent Leaves (Efirin)", cat:"produce", origin:"Nigeria", emoji:"🌿", bg:"#E8F5EC", img:"images/scent-leaves.jpeg", tag:"New",
   desc:"Air dehydrated scent leaves (efirin) for soups, stews and sauces. Retains aroma and flavour.",
   sizes:[["30g",""]], stock:true},
  {name:"Naija Bites Air Dehydrated Uziza Leaves", cat:"produce", origin:"Nigeria", emoji:"🌿", bg:"#E8F5EC", img:"images/uziza-leaves.jpeg", tag:"New",
   desc:"Air dehydrated ugu leaves for soups, stews and sauces. Retains aroma and flavour.",
   sizes:[["30g",""]], stock:true},
 
  // ===== CEREALS & DAIRY (11) =====
  {name:"Grace Coconut Milk", cat:"dairy", emoji:"🥥", bg:"#FFF0E0", img:"https://i5.walmartimages.ca/asr/0cca057e-d825-4931-a2a6-d8c460c31499.b7f50dca5f97178728207020fddd8a8a.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF", tag:"Staple",
    desc:"Rich coconut milk for curries, soups and desserts.",sizes:[["400ml","2.50"]], stock:true},
  {name:"Nestle Nido Full Cream Milk Powder", cat:"dairy", emoji:"🥛", bg:"#FFF0E0", img:"https://joesburlington.com/cdn/shop/files/Nestle_Nido_Instant_Full_Cream_Milk_Powder_-_2.5kg.png?v=1755703785", tag:"Staple",
    desc:"Full cream milk powder for beverages and cooking.",sizes:[["400g","15.99"],["900g","30.00"],["2.5kg","78.00"]], stock:true},
  {name:"Nestle Milo Powder", cat:"dairy", emoji:"🥛", bg:"#FFF0E0", img:"https://i.ebayimg.com/images/g/hNIAAOSwIa9nXG4-/s-l1600.webp", tag:"Staple",
    desc:"Chocolate malt powder for beverages and cooking.",sizes:[["800g","23.99"],["1.4kg","38.00"]], stock:true},
  {name:"Nestle Golden Morn Powder", cat:"dairy", emoji:"🥛", bg:"#FFF0E0", img:"https://www.mychopchop.ca/cdn/shop/products/mychopchop-product-africanonlinegrocery-canada-shopsmart-domore-nigerianonlinegrocery-1378_736x736.jpg?v=1587271226", tag:"Staple",
    desc:"Fortified cereal powder for beverages and cooking.",sizes:[["900g","20.00"]], stock:true},
  {name:"Peak Instant White Milk Powder", cat:"dairy", emoji:"🥛", bg:"#FFF0E0", img:"https://starfishmarket.ca/cdn/shop/files/3711.png?v=1690662235&width=1900", tag:"Staple",
    desc:"Instant white milk powder for beverages and cooking.",sizes:[["400g","15.00"],["2.5kg","78.00"],["350ml(evaporated milk)", "7.50"]], stock:true},
  {name:"Lady B Custard Powder", cat:"dairy", emoji:"🥛", bg:"#FFF0E0", img:"https://www.mychopchop.ca/cdn/shop/products/mychopchop-product-africanonlinegrocery-canada-shopsmart-domore-nigerianonlinegrocery-9914_736x736.jpg?v=1584670414", tag:"Staple",
    desc:"Custard powder for desserts and beverages.",sizes:[["500g","10.00"]], stock:true},
  {name:"Susan Custard Powder Vanilla", cat:"dairy", emoji:"🥛", bg:"#FFF0E0", img:"https://chamuze.com/wp-content/uploads/2024/02/amel-suan-copy-20.jpg", tag:"Staple",
    desc:"Custard powder for desserts and beverages.",sizes:[["500g","18.00"],["2kg","20.00"]], stock:true},
  {name:"Checkers Custard Vanilla Flavour", cat:"dairy", emoji:"🥛", bg:"#FFF0E0", img:"https://foodbasketcanada.com/wp-content/uploads/2024/07/Breakfast_0005_checkers-custard-jpg.webp", tag:"Staple",
    desc:"Custard powder for desserts and beverages.",sizes:[["1,5kg","18.00"]], stock:true},
  {name:"Checkers Custard Milk Flavour", cat:"dairy", emoji:"🥛", bg:"#FFF0E0", img:"https://i5.walmartimages.com/seo/Checkers-3-in-1-Milk-Custard-1-5-KG_dae3d845-cb44-424d-a82a-3259edd727a0.f7ef46758c80d8e47f4132606bd1ea5d.png?odnHeight=573&odnWidth=573&odnBg=FFFFFF", tag:"Staple",
    desc:"Custard powder for desserts and beverages.",sizes:[["1,5kg","18.00"]], stock:true},
  {name:"Checkers Custard Pap Flavour - Akamu", cat:"dairy", emoji:"🥛", bg:"#FFF0E0", img:"https://foodbasketcanada.com/wp-content/uploads/2026/01/img_2772-1536x1536.png", tag:"Staple",
    desc:"Custard powder for desserts and beverages.",sizes:[["1.5kg","20.00"]], stock:true},
  {name:"Cerelac Mixed Fruit & Wheats Cereal", cat:"dairy", emoji:"🥛", bg:"#FFF0E0", img:"https://digital.loblaws.ca/PCX/21670835_EA/en/1/21670835_enfr_front_400.png", tag:"Staple",sizes:[["1kg","26.00"]], stock:true},
  {name:"Grandios Brown Pap (Ogi / Koko / Akamu)", cat:"dairy", origin:"Nigeria", emoji:"🥣", bg:"#FFE8D6", img:"images/grandios-pap-brown.jpg", tag:"Popular",
   desc:"Brown pap for ogi, koko and akamu. Resealable pack, no preservatives or additives.",
   sizes:[["500g (1.1lb)",""]], stock:true},

  // ===== BEANS & LEGUMES (6) =====
  {name:"Black-Eyed Peas", cat:"beans", origin:"West Africa", emoji:"🫘", bg:"#FEF5E4", img:"", tag:"Staple",
   desc:"Clean, high-quality black-eyed peas for moi moi, akara and beans porridge.",
   sizes:[["1kg","4.49"],["2kg","7.99"]], stock:true},
  {name:"Green Giant Corn Kernels", cat:"beans", emoji:"🌽", bg:"#FEF5E4", img:"https://i5.walmartimages.ca/asr/dc543187-d9ba-44d2-ae20-558f77e77d1e.fb16231a652590bb964a29a2b626dbaf.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF", tag:"Staple",
    desc:"Sweet corn kernels, perfect for salads, soups and side dishes.",sizes:[["341ml","2.99"]], stock:true},
  {name:"Clic Small Red Beans", cat:"beans", emoji:"🫘", bg:"#FEF5E4", img:"https://i5.walmartimages.com/asr/39da4aff-9ac3-46e7-9ff8-2c908bf78c3a.24901940f1b044ac78f965a84ce9b03e.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF", tag:"Staple",
    desc:"Small red beans for soups, stews and side dishes.",sizes:[["5kg","43.00"]], stock:true},
  {name:"Iron Beans (Black-Eyed Peas)", cat:"beans", origin:"Nigeria", emoji:"🫘", bg:"#FEF5E4", img:"images/iron-beans.jpg", tag:"Staple",
   desc:"Clean, high-quality black-eyed peas for moi moi, akara and beans porridge.",
   sizes:[["2.5kg","15.30"],["5kg","30.00"]], stock:true},
  {name:"Brown Beans", cat:"beans", origin:"", emoji:"🫘", bg:"#FFE8D6", img:"images/brown-beans.jpg", tag:"Staple",
   desc:"Nigerian-style brown beans for hearty stews and porridge.",
   sizes:[["2.5kg","15.00"],["5kg","30.00"]], stock:true},
  {name:"'Oloyin' Honey Beans", cat:"beans", origin:"Nigeria", emoji:"🫘", bg:"#FEF5E4", img:"images/oloyin-beans.jpg", tag:"Staple",
    desc:"Sweet Nigerian honey beans for porridge, moi moi and akara.", sizes:[["2.5kg","18.00"],["5kg","36.00"]], stock:true},
  {name:"Tato Gourment Kori Peeled Black Beans", cat:"beans", origin:"West Africa", emoji:"🫘", bg:"#E8F5EC", img:"images/peeled-black-beans.jpeg", tag:"Staple",
   desc:"Peeled black beans for soups, stews and side dishes. High in protein and fibre.",
   sizes:[["500g",""]], stock:true},
  {name:"Dry Corn (Maize)", cat:"beans", origin:"West Africa", emoji:"🌽", bg:"#FEF5E4", img:"images/dry-corn.jpeg", tag:"Staple",
   desc:"Dried corn kernels for soups, stews and side dishes. Can be ground into cornmeal.",
   sizes:[["1kg","3.50"],["2kg","6.00"]], stock:true},
  {name:"Tiger Nuts (Dried)", cat:"beans", origin:"West Africa", emoji:"🌰", bg:"#FEF5E4", img:"images/tiger-nut.jpeg", tag:"Popular",
   desc:"Dried tiger nuts for snacking, beverages and desserts. Can be soaked or ground into flour.",
   sizes:[["250g",""],["810g",""]], stock:true},
  {name:"Haricot Tortue Noire Beans (Black Turtle Beans)", cat:"beans", origin:"West Africa", emoji:"🫘", bg:"#FEF5E4", img:"images/turtle-beans.jpeg", tag:"Staple",
   desc:"Black turtle beans for soups, stews and side dishes. High in protein and fibre.",
   sizes:[["1kg","15.00"]], stock:true},
  {name:"African Breadfruit (Ukwa)", cat:"beans", origin:"Nigeria", emoji:"🌰", bg:"#FFF3CC", img:"images/ukwa.jpeg", tag:"New",
   desc:"Dried African breadfruit seeds for soups and stews. Nutty and rich in protein.",
   sizes:[["320g","25.00"]], stock:true},
  {name:"Toto Gourmet Koki (Peeled Black-Eye Beans)", cat:"beans", origin:"Packed in QC", emoji:"🫘", bg:"#FEF5E4", img:"images/koki-peeled-blackeye-beans.jpg", tag:"New",
   desc:"Pre-peeled black-eye beans — ready for koki, moi moi and akara with no skinning needed.",
   sizes:[["1kg",""]], stock:true},
  {name:"Frozen Washed Beans", cat:"beans", origin:"Frozen · approx. 0.86kg", emoji:"🫘", bg:"#FEF5E4", img:"images/frozen-washed-beans.jpg", tag:"Popular",
   desc:"Peeled, washed beans ready to blend — skip the hours of peeling for moi moi and akara.",
   sizes:[["",""]], stock:true},

 
  // ===== DRINKS (6) =====
  {name:"Gato keza Kigufi Coffee estate", cat:"drinks",origin:"Rwanda", emoji:"☕", bg:"#FFF3CC", img:"https://images.wildernessdestinations.com/resources/wilderness-safaris/uploads/medium/file/19101/original_dimensions_Gato_Keza_coffee_packaging.jpg", tag:"Popular",
    sizes:[["250g","9.99"]], stock:true},
  {name:"Nescafe Rich Instant Coffee", cat:"drinks", emoji:"☕", bg:"#FFF3CC", img:"https://m.media-amazon.com/images/I/71Abx-0sXxL._AC_SY300_SX300_QL70_ML2_.jpg", tag:"Staple",
    desc:"Rich and smooth instant coffee for a quick caffeine fix.",sizes:[["475g","7.99"]], stock:true},
  {name:"Cool Runnings Ginger Tumeric Tea with Honey", cat:"drinks", emoji:"☕", bg:"#FFF3CC", img:"https://i5.walmartimages.ca/asr/a6b01303-5e7d-4438-bf58-9348d9bbed00.e37e1c833636c75aadfb16e9f53de3d7.png?odnHeight=640&odnWidth=640&odnBg=FFFFFF", tag:"Staple",
    desc:"Ginger turmeric tea for a soothing and healthy beverage.",sizes:[["20 bags","5.99"]], stock:true},
  {name:"Mekong Honey Ginger Instant Herbal Tea", cat:"drinks", emoji:"☕", bg:"#FFF3CC", img:"https://coolrunningsfoods.ca/cdn/shop/products/Honey-Ginger-Tea-Mekong_1500x.jpg?v=1617029296", tag:"Staple",
    desc:"Instant herbal tea with honey and ginger for a soothing beverage.",sizes:[["20 bags","5.99"]], stock:true},
  {name:"Js Natural Honey", cat:"drinks", emoji:"🍯", bg:"#FFF3CC", img:"https://themeatheadstore.com/cdn/shop/files/js-natural-honey-500g-165951.jpg?v=1746678001&width=1080", tag:"Staple",
    desc:"Natural honey for sweetening beverages and cooking.",sizes:[["500g","10.00"]], stock:true},
  {name:"Zobo Leaves (Dried Hibiscus)", cat:"drinks", origin:"Nigeria", emoji:"🌺", bg:"#FDEAEA", img:"images/zobo-leaves.jpg", tag:"Popular",
   desc:"Dried hibiscus leaves for brewing zobo — a refreshing, tangy Nigerian drink.",
   sizes:[["45g",""],["125g",""]], stock:true},
  {name:"Nkulenu Fanti Kenkey (Corn Dough)", cat:"drinks", origin:"Ghana", emoji:"🌽", bg:"#FEF5E4", img:"https://afroshopsow.ch/wp-content/uploads/2021/03/Box_15_003.jpg", tag:"Popular",
   desc:"Fermented corn dough for making kenkey — a traditional Ghanaian dish.",
   sizes:[["500g",""],["1kg",""]], stock:true},
 
  // ===== SNACKS (9) =====
  {name:"Mr John's Spicy Ripe Plantain Chips", cat:"snacks", emoji:"🍌", bg:"#FFF0E0", img:"https://shop.africanfoodsupermarket.com/cdn/shop/products/IMG-5592_1200x.jpg?v=1612201365", tag:"Staple",
    desc:"Crispy and spicy plantain chips made from ripe plantains.",sizes:[["150g","4.00"],["350g","8.00"]], stock:true},
  {name:"Mr John's Unripe Plantain Chips", cat:"snacks", emoji:"🍌", bg:"#FEF5E4", img:"https://orderfromalimas.ca/cdn/shop/products/plantain-chips-front-GR-compressor.png?v=1588362120", tag:"Staple",
    desc:"Crispy plantain chips made from unripe plantains.",sizes:[["150g","4.00"],["300g","8.00"]], stock:true},
  {name:"Geisha Gem Sweet Biscuits", cat:"snacks", emoji:"🍪", bg:"#FFF3CC", img:"https://thespicecentre.com/wp-content/uploads/2021/03/3-11.jpeg", tag:"Staple",
    desc:"Sweet biscuits with a unique flavor, perfect for tea or coffee.",sizes:[["200g","5.00"]], stock:true},
  {name:"Vidhya Almond Cookies", cat:"snacks", emoji:"🍪", bg:"#FFF3CC", img:"https://www.vidhyafoods.com/wp-content/uploads/2021/08/almond-cookies-700x712.jpg", tag:"Staple",
    desc:"Crunchy almond cookies, perfect for tea or coffee.",sizes:[["340g","6.50"]], stock:true},
  {name:"Vidhya Pistchio Cookies", cat:"snacks", emoji:"🍪", bg:"#FFF3CC", img:"https://www.vidhyafoods.com/wp-content/uploads/2021/08/pistachio-cookies-700x712.jpg", tag:"Staple",
    desc:"Crunchy pistachio cookies, perfect for tea or coffee.",sizes:[["340g","6.50"]], stock:true},
  {name:"Vidhya Coconut Cookies", cat:"snacks", emoji:"🍪", bg:"#FFF3CC", img:"https://www.vidhyafoods.com/wp-content/uploads/2021/08/coconut-cookies-700x712.jpg", tag:"Staple",
    desc:"Crunchy coconut cookies, perfect for tea or coffee.",sizes:[["340g","6.50"]], stock:true},
  {name:"Go Popcorn Nigerian Sweet Popcorn", cat:"snacks", emoji:"🍿", bg:"#FFF3CC", img:"https://invexfoods.com/cdn/shop/files/CHINCHIN-3BackgroundRemoved.png?v=1693937398&width=1426", tag:"Staple",
    desc:"Sweet and crunchy popcorn, a popular snack in Nigeria.",sizes:[["115g","5.00"]], stock:true},
  {name:"Burger Peanut Snack", cat:"snacks", emoji:"🥜", bg:"#FFF3CC", img:"https://m.media-amazon.com/images/I/81JYqNow4bL._SY879_.jpg", tag:"Staple",
    desc:"Crunchy peanut snack, perfect for on-the-go.",sizes:[["50g","2.00"]], stock:true},
  {name:"Chin Chin (House-Made)", cat:"snacks", origin:"African Food Market", emoji:"🍥", bg:"#FFF3CC", img:"images/chin-chin.jpg", tag:"Popular",
   desc:"Freshly made in-store. Crunchy, lightly sweet Nigerian fried dough snack.",
   sizes:[["300g","8.99"],["560g","15.00"]], stock:true},
  {name:"Vicks Lemon Plus Throat Lozenges", cat:"snacks", origin:"", emoji:"🍋", bg:"#FEF5E4", img:"https://www.naijamarket.co.za/wp-content/uploads/2023/05/Vicks-Lemon-Plus.png", tag:"Staple",
   desc:"Medicated lemon throat lozenges with Vitamin C.",
   sizes:[["97g",""]], stock:true},
  {name:"Vicks Blue Throat Lozenges", cat:"snacks", origin:"", emoji:"🟦", bg:"#E8F0FF", img:"https://foodbasketcanada.com/wp-content/uploads/2025/10/Vicks_Baba_Blue_Sweet_Lozenges-e1761961312340.webp", tag:"Staple",
   desc:"Extra strong, extra fresh medicated throat lozenges.",
   sizes:[["97g",""]], stock:true},
  {name:"Red Peanuts (Arachide Rouge)", cat:"snacks", origin:"West Africa", emoji:"🥜", bg:"#FFE8E7", img:"images/red-peanuts.jpg", tag:"Popular",
   desc:"100% raw red-skin peanuts — roast them, make groundnut soup or snack as they are.",
   sizes:[["2lb","15.00"]], stock:true},
  {name:"Oxford Sweetened Cabin Biscuits", cat:"snacks", origin:"Nigeria", emoji:"🍪", bg:"#FFE8E7", img:"images/oxford-cabin-biscuits.jpg", tag:"Staple",
   desc:"Classic sweetened cabin biscuits — crunchy with tea, pap or on their own.",
   sizes:[["Fresh Pack",""]], stock:true},
  {name:"Kaolin (Edible Clay)", cat:"snacks", origin:"Packed in Canada", emoji:"🪨", bg:"#FEF5E4", img:"images/kaolin.jpg", tag:"Staple",
   desc:"Natural kaolin clay. Store in a cool, dry place.",
   sizes:[["150g",""]], stock:true},
  {name:"Nzu (Calabash Chalk)", cat:"snacks", origin:"West Africa", emoji:"🪨", bg:"#FEF5E4", img:"images/nzu-calabash-chalk.jpg", tag:"Staple",
   desc:"Traditional calabash chalk (nzu), sold in small packs.",
   sizes:[["Small pack",""]], stock:true},
 
  // ===== BEAUTY (5) =====
  {name:"Dudu Osun Herbal Soap", cat:"beauty", origin:"Nigeria", emoji:"🧼", bg:"#E8F5EC", img:"https://herabeauty.ca/cdn/shop/files/Dudu-Osun-Black-Soap-150g.png?v=1753203452&width=1620", tag:"Staple",
    desc:"Traditional African black soap for skin care.",sizes:[["150g","4.99"]], stock:true},
  {name:"Alata Samina Black Soap", cat:"beauty", origin:"Ghana", emoji:"🧼", bg:"#E8F5EC", img:"https://duafe.eu/wp-content/uploads/2023/09/ALATA.png", tag:"Staple",
    desc:"Natural black soap for skin care and cleansing.",sizes:[["400g","9.99"]], stock:true},
  {name:"Raw Shea Butter", cat:"beauty", origin:"Nigeria", emoji:"🧴", bg:"#FEF5E4", img:"images/shea-butter.jpg", tag:"Popular",
   desc:"100% pure unrefined shea butter for skin and hair. For external use only.",
   sizes:[["185g",""]], stock:true},
  {name:"X-Pression 3X Pre-Stretched Braid 50' ", cat:"beauty", origin:"Braiding hair", emoji:"💇🏾‍♀️", bg:"#FDEAEA", img:"https://www.maryqueentrade.ca/cdn/shop/files/3X_PRE_STRETCHED_50_COL_1B.png?v=1779906295&width=1380", tag:"Popular",
   desc:"Pre-stretched braiding hair for knotless braids and box braids. Colours incl. 1, 1B, 2, 4.",
   sizes:[["Colour 1B","12.50"],["Colour 1","13.50"],["Colour 350","13.50"]], stock:true},
    {name:"X-Pression 3X Pre-Stretched Braid 60' ", cat:"beauty", origin:"Braiding hair", emoji:"💇🏾‍♀️", bg:"#FDEAEA", img:"https://www.maryqueentrade.ca/cdn/shop/files/3X_PRE_STRETCHED_50_COL_1B.png?v=1779906295&width=1380", tag:"Popular",
   desc:"Pre-stretched braiding hair for knotless braids and box braids. Colours incl. 1, 1B, 2, 4.",
   sizes:[["Colour 1B","12.50"],["Colour 2","13.50"]], stock:true},
  {name:"X-Pression Boho Curl Crochet Braid", cat:"beauty", origin:"Braiding hair", emoji:"💇🏾‍♀️", bg:"#FDEAEA", img:"https://www.maryqueentrade.ca/cdn/shop/files/BOHO-CURL-2.jpg?v=1767647745&width=1380", tag:"New",
   desc:"Boho curl crochet braiding hair for a soft, wavy finish. Colour 4.",
   sizes:[["Colour 4",""]], stock:true},
  {name:"Ali'tress Afro Kinky Twist (3X)- 24'", cat:"beauty", origin:"Braiding hair", emoji:"💇🏾‍♀️", bg:"#E8F5EC", img:"https://static.wixstatic.com/media/3cf277_2710eb0d6b90400b93f093b9ab23df13~mv2.jpg/v1/fill/w_996,h_1000,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cf277_2710eb0d6b90400b93f093b9ab23df13~mv2.jpg", tag:"Popular",
   desc:"3X triple-pack afro kinky twist — great for butterfly locs, bomb twist, spring twist and passion twist. Colours 27, 30, T1B/27, T1B/118.",
   sizes:[["Colour 24","18.00"],["Colour T1B/118","18.00"],["Colour 27","18.00"]], stock:true},
  {name:"Ali'tress French Curl Braid - 22'", cat:"beauty", origin:"Braiding hair", emoji:"💇🏾‍♀️", bg:"#E8F5EC", img:"https://gilgalbeauty.ca/cdn/shop/files/20230715_181049_1024x1024.jpg?v=1689459454", tag:"Hot",
   desc:"French curl braiding hair for elegant curly-end braids. Colour 1.",
   sizes:[["Colour 1","25.99"]], stock:true},
  {name:"Ali'tress Bulk Pre-Stretched Braid, Water wave - 20-22'", cat:"beauty", origin:"Braiding hair", emoji:"💇🏾‍♀️", bg:"#E8F5EC", img:"https://jerahbeauty.com/cdn/shop/files/BOHOWater.webp?v=1747083404", tag:"Staple",
   desc:"Premium-fibre water-wave bulk braid, good for boho and bohemian braids. Colour 30.",
   sizes:[["Colour 27","20.00"]], stock:true},
  {name:"Ali'tress Bulk Pre-Stretched Braid Deep", cat:"beauty", origin:"Braiding hair", emoji:"💇🏾‍♀️", bg:"#E8F5EC", img:" https://i5.walmartimages.com/seo/AliTress-Bulk-Synthetic-Hair-Braids-DEEP-BULK-18-20_6285b7ec-940a-465c-b73c-7d484ffd3961.3f8e41225171728ca7ec8c6b0803b6a0.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF", tag:"Staple",
   desc:"Premium-fibre deep-wave bulk braid, good for boho and bohemian braids. Colour T1B/30.",
   sizes:[["Colour 1","20.00"],[["Colour T1B/30","20.00"]]], stock:true},
  {name:"Ali'tress Bulk Pre-Stretched Braid Yaky Straight -18-20'", cat:"beauty", origin:"Braiding hair", emoji:"💇🏾‍♀️", bg:"#E8F5EC", img:"https://m.media-amazon.com/images/I/51EGvYu4rjL._SX679_.jpg", tag:"Staple",
   desc:"Premium-fibre deep-wave bulk braid, good for boho and bohemian braids. Colour T1B/30.",
   sizes:[["Colour 1B","20.00"]], stock:true},
  {name:"Magic Gold 3X Pre-Looped Crochet Braid", cat:"beauty", origin:"Braiding hair", emoji:"💇🏾‍♀️", bg:"#FDEAEA", img:"https://hairnergybraids.com/cdn/shop/products/388B943B-2303-4CD4-8BC9-D37DCB55FBB9_1512x.jpg?v=1626123388", tag:"Popular",
   desc:"3X pre-looped crochet braid for quick, easy install. Colour T1B/30.",
   sizes:[["Colour T1B/30","10.99"]], stock:true},
  {name:"Extract Whitening Herbal Soap", cat:"beauty", origin:"Nigeria", emoji:"🧼", bg:"#FEF5E4", img:"https://skinol.com.ng/wp-content/uploads/2023/01/F8DAA7F8-8E6D-46E6-992C-13F136714ECD-scaled.jpeg", tag:"Staple",
   desc:"Whitening herbal soap with papaya and lime for brightening and cleansing.",
   sizes:[["1 bar",""]], stock:true},
  {name:"Tura Germicidal Medicated Soap", cat:"beauty", origin:"Nigeria", emoji:"🧼", bg:"#FFF3CC", img:"https://i1.wp.com/spicetown.fi/wp-content/uploads/Tura-Germicidal-Medicated-Soap-3-x-65g.jpg?w=1020&ssl=1", tag:"Popular",
   desc:"Germicidal medicated soap for everyday antibacterial cleansing.",
   sizes:[["1 bar",""]], stock:true},
  {name:"Dettol Cool Soap", cat:"beauty", origin:"", emoji:"🧼", bg:"#E8F0FF", img:"https://thespicebazaar.ca/wp-content/uploads/2025/01/ITEM-29.jpg", tag:"Staple",
   desc:"Antibacterial bar soap with a cool, fresh finish.",
   sizes:[["1 bar",""]], stock:true},
  {name:"Sada Powdered Laundry Detergent", cat:"beauty", origin:"Lavender fragrance", emoji:"🧺", bg:"#F3E8FF", img:"images/sada-detergent.jpg", tag:"Staple",
   desc:"Powdered laundry detergent with lavender fragrance. 40+ loads.",
   sizes:[["500g",""]], stock:true},
  {name:"So Klin Concentrated Detergent", cat:"beauty", origin:"Nigeria", emoji:"🧺", bg:"#E8F0FF", img:"images/soklin-detergent.jpg", tag:"Popular",
   desc:"Free-flow concentrated washing powder with 2x cleaning power. Dissolves easily.",
   sizes:[["",""]], stock:true},
  {name:"Darling Empress Curly Braid", cat:"beauty", origin:"Braiding hair", emoji:"💇🏾‍♀️", bg:"#F3E8FF", img:"", tag:"Popular",
   desc:"Pre-curled, pre-treated silky curly braid with a human-hair feel. 100% premium blend.",
   sizes:[["40\"",""]], stock:true},
  {name:"Darling Empress Loose Braid", cat:"beauty", origin:"Braiding hair", emoji:"💇🏾‍♀️", bg:"#F3E8FF", img:"", tag:"Popular",
   desc:"Long loose braid, pre-curled and pre-treated. Best for soft, loose braid styles.",
   sizes:[["60\"",""]], stock:true},
  {name:"Mary Queen Passion 3X Twist", cat:"beauty", origin:"Braiding hair", emoji:"💇🏾‍♀️", bg:"#FFE8D6", img:"", tag:"Hot",
   desc:"Itch-free pre-stretched passion twist — easy to feed in, great for knotless braids. Colours 1B, T1B/350.",
   sizes:[["18\"","17.99"]], stock:true},
  {name:"Mary Queen Hawana Curl", cat:"beauty", origin:"Braiding hair", emoji:"💇🏾‍♀️", bg:"#FFE8D6", img:"", tag:"Popular",
   desc:"Tangle-free 100% modakalon crochet curl. Colours T1B/30, T1B/350.",
   sizes:[["","15.99"]], stock:true},
  {name:"Mary Queen Kinky Curl 4X", cat:"beauty", origin:"Braiding hair", emoji:"💇🏾‍♀️", bg:"#FFE8D6", img:"", tag:"Popular",
   desc:"Premium organic fibre kinky curl, 4X pack, 160g.",
   sizes:[["","24.99"]], stock:true},
  {name:"Mary Queen 3X Kids Braid", cat:"beauty", origin:"Braiding hair", emoji:"💇🏾‍♀️", bg:"#FDEAEA", img:"", tag:"New",
   desc:"Pre-stretched braiding hair sized for kids. Colour T1B/27.",
   sizes:[["28\"",""]], stock:true},
  {name:"Mary Queen River Locs", cat:"beauty", origin:"Braiding hair", emoji:"💇🏾‍♀️", bg:"#FDEAEA", img:"", tag:"New",
   desc:"Premium organic fibre river locs for a soft, natural loc look. Colour 1B.",
   sizes:[["10\"",""]], stock:true},
  {name:"X-Pression Pearl Locs", cat:"beauty", origin:"Braiding hair", emoji:"💇🏾‍♀️", bg:"#FDEAEA", img:"", tag:"New",
   desc:"Crochet pearl locs, 120g. Colour 33.",
   sizes:[["20\"",""]], stock:true},
  {name:"X-Pression Daniela", cat:"beauty", origin:"Braiding hair", emoji:"💇🏾‍♀️", bg:"#FDEAEA", img:"", tag:"Popular",
   desc:"Soft crochet braid hair, 150g.",
   sizes:[["15\"","23.99"]], stock:true},
  {name:"X-Pression Ultra Braid (Horizon)", cat:"beauty", origin:"Braiding hair", emoji:"💇🏾‍♀️", bg:"#E8F0FF", img:"", tag:"Staple",
   desc:"100% Kanekalon ultra braid, hot-water set.",
   sizes:[["",""]], stock:true},
  {name:"X-Pression Lagos Braid", cat:"beauty", origin:"Braiding hair", emoji:"💇🏾‍♀️", bg:"#E8F0FF", img:"", tag:"Staple",
   desc:"100% Kanekalon Lagos braid. Colour T1/39.",
   sizes:[["",""]], stock:true},
  {name:"X-Pression 7X Pre-Stretched Braid", cat:"beauty", origin:"Braiding hair", emoji:"💇🏾‍♀️", bg:"#E8F0FF", img:"", tag:"Popular",
   desc:"Extra-long 7X pre-stretched braid, 155g one-pack. Colour T1/33.",
   sizes:[["52\"",""]], stock:true},
  {name:"Xperience First Lady (6pcs)", cat:"beauty", origin:"Braiding hair", emoji:"💇🏾‍♀️", bg:"#FFE8D6", img:"", tag:"Popular",
   desc:"One-pack full head crochet braid, 6 pieces. Also in Devia Curl.",
   sizes:[["",""]], stock:true},
  {name:"EZX28 Pre-Stretched Braid (Kids)", cat:"beauty", origin:"Braiding hair", emoji:"💇🏾‍♀️", bg:"#FFF3CC", img:"", tag:"New",
   desc:"3X pre-stretched 100% Kanekalon braid, hot-water activated and flame retardant. Kid-friendly. Colour OM1B/27.",
   sizes:[["28\"",""]], stock:true},

 // ===== FROZEN FOODS =====
  {name:"Chopped Okra", cat:"frozen", origin:"Rosy's Foods · 500g", emoji:"🌿", bg:"#E8F5EC", img:"images/chopped-okra.jpg", tag:"Popular",
   desc:"Frozen chopped okra — ready for okra soup and stews without the prep. Keep frozen.",
   sizes:[["500g",""]], stock:true},
  {name:"Waterleaf", cat:"frozen", origin:"Timoyo Foods · Nigeria · 500g", emoji:"🌿", bg:"#E8F5EC", img:"images/waterleaf.jpg", tag:"Popular",
   desc:"Frozen waterleaf — a soft, quick-cooking green for edikaikong and vegetable soups.",
   sizes:[["500g",""]], stock:true},
  {name:"Snail", cat:"frozen", origin:"Frozen", emoji:"🐌", bg:"#FDEAEA", img:"images/snail.jpg", tag:"Hot",
   desc:"Cleaned frozen snails (igbin/congo meat) — a delicacy for peppered snail and assorted stews.",
   sizes:[["",""]], stock:true},
  {name:"Water Fufu", cat:"frozen", origin:"Noudaf · cassava paste · 1kg", emoji:"🍚", bg:"#FEF5E4", img:"images/water-fufu.jpg", tag:"Staple",
   desc:"Cameroonian water fufu (pâte de manioc) — soft cassava swallow, pairs with eru and ndolé.",
   sizes:[["1kg",""]], stock:true},
  {name:"Chopped Spinach (IQF)", cat:"frozen", origin:"Frozen · 907g (2lb)", emoji:"🌿", bg:"#E8F5EC", img:"images/chopped-spinach.jpg", tag:"Staple",
   desc:"Individually quick-frozen chopped spinach, 100% natural, no preservatives. Grade A.",
   sizes:[["907g",""]], stock:true},
  {name:"Folere (Ngai-Ngai / Oseille Leaves)", cat:"frozen", origin:"Tropical Delight · 500g", emoji:"🌿", bg:"#E8F5EC", img:"images/folere-oseille.jpg", tag:"New",
   desc:"Frozen sorrel/oseille leaves (folere, ngai-ngai) — tangy greens for sauces and folere drink.",
   sizes:[["500g",""]], stock:true},
  {name:"Miondo", cat:"frozen", origin:"Noudaf · cassava bread · 1kg", emoji:"🥖", bg:"#FEF5E4", img:"images/miondo-cassava-bread.jpg", tag:"Popular",
   desc:"Cameroonian miondo — fermented cassava sticks wrapped and steamed. Serve with fish or stew.",
   sizes:[["1kg",""]], stock:true},
  {name:"Matembele", cat:"frozen", origin:"100% potato leaves · Canada", emoji:"🌿", bg:"#E8F5EC", img:"images/matembele.jpg", tag:"New",
   desc:"Frozen matembele (sweet-potato leaves) — a Central African green for rich, hearty greens dishes.",
   sizes:[["",""]], stock:true},
  {name:"Fumbwa", cat:"frozen", origin:"100% fumbwa · Canada", emoji:"🌿", bg:"#E8F5EC", img:"images/fumbwa.jpg", tag:"Hot",
   desc:"Frozen fumbwa (wild spinach / eru) — Congolese favourite, cooked with fish and palm oil.",
   sizes:[["",""]], stock:true},
  {name:"Frozen Bitter Leaf", cat:"frozen", origin:"Frozen · 0.37kg", emoji:"🌿", bg:"#E8F5EC", img:"images/frozen-bitter-leaf.jpg", tag:"Popular",
   desc:"Washed frozen bitter leaf (onugbu) — for bitterleaf soup and egusi. Keep frozen.",
   sizes:[["",""]], stock:true},
  {name:"Ndole", cat:"frozen", origin:"100% vernonia · Canada", emoji:"🌿", bg:"#E8F5EC", img:"images/ndole.jpg", tag:"Hot",
   desc:"Frozen ndolé (bitter vernonia leaves) — the base for Cameroon's signature ndolé dish.",
   sizes:[["",""]], stock:true},
  {name:"Molokhia Minced", cat:"frozen", origin:"Shahrazad · 400g", emoji:"🌿", bg:"#E8F5EC", img:"images/molokhia-minced.jpg", tag:"Staple",
   desc:"Minced frozen molokhia (jute leaves) — premium quality, for the classic silky molokhia soup.",
   sizes:[["400g",""]], stock:true},
  {name:"Safou", cat:"frozen", origin:"African plum · Canada", emoji:"🫒", bg:"#F3E8FF", img:"images/safou.jpg", tag:"New",
   desc:"Frozen safou (African plum / prune) — soft, buttery flesh, delicious boiled or roasted.",
   sizes:[["",""]], stock:true},
  {name:"Frozen Banana (Amatooke)", cat:"frozen", origin:"Uganda · organic", emoji:"🍌", bg:"#FFF3CC", img:"images/frozen-banana-amatooke.jpg", tag:"Popular",
   desc:"Peeled frozen matooke (green cooking banana) — steam and mash for the classic Ugandan staple.",
   sizes:[["",""]], stock:true},
  {name:"Bobolo", cat:"frozen", origin:"Noudaf · cassava bread · 1.5kg", emoji:"🥖", bg:"#FEF5E4", img:"images/bobolo-cassava-bread.jpg", tag:"Popular",
   desc:"Cameroonian bobolo — fermented cassava loaf steamed in leaves. Pairs with fish and pepper sauce.",
   sizes:[["1.5kg",""]], stock:true},
  {name:"Frozen Cooked Sweet Potato", cat:"frozen", origin:"Uganda · organic · ready to eat", emoji:"🍠", bg:"#FFE8D6", img:"images/frozen-sweet-potato.jpg", tag:"New",
   desc:"Pre-cooked frozen sweet potato — just microwave and serve. Product of Uganda.",
   sizes:[["",""]], stock:true},
  {name:"Frozen Beans", cat:"frozen", origin:"Uganda · 1kg", emoji:"🫘", bg:"#FEF5E4", img:"images/frozen-beans.jpg", tag:"Staple",
   desc:"Frozen cooked beans — tender and ready to warm through for a quick, hearty side.",
   sizes:[["1kg",""]], stock:true},
  {name:"Attiéké", cat:"frozen", origin:"Aliza · Côte d'Ivoire · 1kg", emoji:"🍚", bg:"#FEF5E4", img:"images/attieke.jpg", tag:"Popular",
   desc:"Ivorian attiéké — steamed cassava couscous, gluten-free. Serve with grilled fish and pepper.",
   sizes:[["",""]], stock:true},
  ];

var TAG_CLASS = {Popular:"tpop", Hot:"thot", New:"tnew", Staple:"tpop"};
var TAG_LABEL = {Popular:"Popular", Hot:"🔥 Hot", New:"New", Staple:"Staple"};

var CAT_NAMES = {
  all:"All Products", grains:"Grains & Flour", spices:"Spices & Seasoning",
  meatfish:"Meat & Fish", oils:"Oils & Sauces", dairy:"Cereals & Dairy",
  beans:"Beans & Legumes", drinks:"Drinks", snacks:"Snacks", beauty:"Beauty",
  frozen:"Frozen Foods", produce:"Fresh Produce"
};

var currentCat = 'all';
var currentSearch = '';

function productImageHTML(p, forModal){
  if(p.img){ return '<img src="'+p.img+'" alt="'+p.name+'"/>'; }
  return forModal ? p.emoji : '<div class="pi" style="background:'+p.bg+'">'+p.emoji+'</div>';
}

function renderProducts(){
  var grid = document.getElementById('prod-grid');
  var html = '';
  var shown = 0;
  PRODUCTS.forEach(function(p, i){
    // category filter
    if(currentCat !== 'all' && p.cat !== currentCat) return;
    // search filter
    if(currentSearch){
      var hay = (p.name+' '+p.origin+' '+p.cat).toLowerCase();
      if(hay.indexOf(currentSearch) < 0) return;
    }
    shown++;
    var firstPrice = p.sizes[0][1];
    var imgInner = p.img ? '<div class="pi"><img src="'+p.img+'" alt="'+p.name+'"/></div>'
                         : '<div class="pi" style="background:'+p.bg+'">'+p.emoji+'</div>';
    var tagHTML = p.tag ? '<span class="pt '+TAG_CLASS[p.tag]+'">'+TAG_LABEL[p.tag]+'</span>' : '';
    var sizeHTML = '';
    if(p.sizes.length > 1){
      sizeHTML = '<div class="psizes">' + p.sizes.map(function(s,si){
        return '<span class="psize'+(si===0?' active':'')+'" onclick="event.stopPropagation();pickSize(this,\''+s[1]+'\')">'+s[0]+'</span>';
      }).join('') + '</div>';
    }
    html += '<div class="pc'+(p.stock?'':' sold-out')+'" onclick="openProduct('+i+')">'
      + '<span class="so-badge">Out of stock</span>'
      + imgInner
      + '<div class="pb">' + tagHTML
      + '<div class="pn">'+p.name+'</div>'
      + (p.origin ? '<div class="po">'+p.origin+'</div>' : '')
      + sizeHTML
      + '<div class="pf"><span class="pp">$'+firstPrice+'</span>'
      + '<button class="ab" onclick="event.stopPropagation();showToast()">+</button></div>'
      + '</div></div>';
  });
  grid.innerHTML = html;
  document.getElementById('prod-heading').textContent =
    currentSearch ? 'Search results' : (CAT_NAMES[currentCat] || 'All Products');
  document.getElementById('prod-empty').style.display = shown === 0 ? 'block' : 'none';
}

function filterCat(cat, btn){
  currentCat = cat;
  document.querySelectorAll('.cat-filter').forEach(function(c){c.classList.remove('active');});
  if(btn){ btn.classList.add('active'); }
  else {
    var match = document.querySelector('.cat-filter[data-filter="'+cat+'"]');
    if(match) match.classList.add('active');
  }
  renderProducts();
}

function goCat(cat){
  go('products', null);
  document.querySelectorAll('.nlinks button').forEach(function(b){
    if(b.textContent.trim() === 'Products') b.classList.add('act');
  });
  filterCat(cat, null);
}

/* ---- PRODUCT SEARCH ---- */
function searchProducts(){
  currentSearch = document.getElementById('prod-search-input').value.toLowerCase().trim();
  document.getElementById('clear-search').style.display = currentSearch ? 'inline' : 'none';
  renderProducts();
}
function clearSearch(){
  document.getElementById('prod-search-input').value = '';
  currentSearch = '';
  document.getElementById('clear-search').style.display = 'none';
  renderProducts();
}

/* ---- PRODUCT DETAIL POP-UP ---- */
function openProduct(i){
  var p = PRODUCTS[i];
  var img = document.getElementById('pm-img');
  // keep the close button, set background/image
  var closeBtn = '<button class="pm-close" onclick="closeProduct()" aria-label="Close">&#x2715;</button>';
  if(p.img){
    img.style.background = '';
    img.innerHTML = closeBtn + '<img src="'+p.img+'" alt="'+p.name+'"/>';
  } else {
    img.style.background = p.bg;
    img.innerHTML = closeBtn + p.emoji;
  }
  var tagEl = document.getElementById('pm-tag');
  if(p.tag){ tagEl.className = 'pm-tag '+TAG_CLASS[p.tag]; tagEl.textContent = TAG_LABEL[p.tag]; tagEl.style.display='inline-block'; }
  else { tagEl.style.display='none'; }
  document.getElementById('pm-name').textContent = p.name;
  document.getElementById('pm-origin').textContent = p.origin;
  document.getElementById('pm-desc').textContent = p.desc || '';
  // sizes
  var sizesWrap = document.getElementById('pm-sizes-wrap');
  var sizesEl = document.getElementById('pm-sizes');
  var priceEl = document.getElementById('pm-price');
  if(p.sizes.length > 1){
    sizesWrap.style.display = 'block';
    sizesEl.innerHTML = p.sizes.map(function(s,si){
      return '<span class="pm-size'+(si===0?' active':'')+'" onclick="pickModalSize(this,\''+s[1]+'\')">'+s[0]+'</span>';
    }).join('');
  } else {
    sizesWrap.style.display = 'none';
    sizesEl.innerHTML = '';
  }
  priceEl.textContent = '$' + p.sizes[0][1];
  // stock
  var stockEl = document.getElementById('pm-stock');
  if(p.stock){ stockEl.className='pm-stock'; stockEl.innerHTML='<i class="ti ti-check"></i> In stock at our store'; }
  else { stockEl.className='pm-stock out'; stockEl.innerHTML='<i class="ti ti-x"></i> Currently out of stock — call to check'; }
  document.getElementById('pmodal').classList.add('on');
}
function pickModalSize(el, price){
  el.parentNode.querySelectorAll('.pm-size').forEach(function(s){s.classList.remove('active');});
  el.classList.add('active');
  document.getElementById('pm-price').textContent = '$' + price;
}
function closeProduct(){ document.getElementById('pmodal').classList.remove('on'); }

function selOpt(t){
  document.getElementById('od').classList.toggle('sel',t==='d');
  document.getElementById('op').classList.toggle('sel',t==='p');
}

/* ---- DELIVERY CALCULATOR ---- */
/*
  We approximate distance from the store (462 Hazeldean Rd, Kanata)
  using a lookup table of Ottawa neighbourhoods & postal prefixes.
  This gives a reliable offline estimate without needing a live API.
  For production, swap calcDelivery() to call Google Maps Distance Matrix.
*/
var STORE_ADDR = "462 Hazeldean Road, Kanata, Ottawa, ON";

// Approximate km from 462 Hazeldean Rd for common Ottawa areas
var AREA_KM = {
  // Zone 1 — 0-5 km (Kanata / Stittsville core)
  "kanata":3,"stittsville":4,"bridlewood":4,"beaverbrook":3,"morgan's grant":3,
  "hazeldean":1,"katimavik":2,"glen cairn":3,"marchwood":3,"fairhaven":4,
  // Zone 2 — 5-10 km
  "bells corners":7,"nepean":9,"barrhaven":10,"merivale":8,"queensway terrace":8,
  "lincoln heights":8,"pinecrest":8,"bayshore":7,"bel air":8,"centrepointe":9,
  "woodroffe":8,"crystal beach":9,"richmond":14,
  // Zone 3 — 10-15 km
  "downtown":13,"centretown":13,"westboro":11,"hintonburg":11,"little italy":12,
  "glebe":14,"old ottawa south":14,"ottawa":13,"sandy hill":14,"vanier":15,
  "overbrook":14,"manor park":15,"new edinburgh":14,
  // Zone 4 — 15-20 km
  "gloucester":17,"orleans":20,"blackburn hamlet":19,"cumberland":22,
  "manotick":19,"riverside south":18,"hunt club":16,"south keys":16,
  "airport":16,"rockcliffe":17,"beacon hill":17
};

var FEES = [
  {max:5,  fee:3.99,  min:25,  label:"Zone 1"},
  {max:10, fee:7.99,  min:35,  label:"Zone 2"},
  {max:15, fee:11.99, min:50,  label:"Zone 3"},
  {max:20, fee:15.00, min:65,  label:"Zone 4"}
];

function matchArea(addr){
  var a = addr.toLowerCase();
  var bestKey = null, bestLen = 0;
  for(var key in AREA_KM){
    if(a.indexOf(key) >= 0 && key.length > bestLen){
      bestKey = key; bestLen = key.length;
    }
  }
  return bestKey;
}

function calcDelivery(){
  var addr  = document.getElementById('addr-input').value.trim();
  var total = parseFloat(document.getElementById('order-total').value) || 0;
  var err   = document.getElementById('addr-error');
  var res   = document.getElementById('cres');

  if(!addr){
    err.style.display='block'; res.style.display='none'; return;
  }
  err.style.display='none';

  var key = matchArea(addr);
  var czl = document.getElementById('czl');
  var czv = document.getElementById('czv');
  var czn = document.getElementById('czn');
  var chips = document.getElementById('cr-chips');
  res.classList.add('on');

  if(!key){
    // Unknown — likely outside Ottawa or too specific
    czl.textContent = "Address not recognised";
    czv.textContent = "Can't estimate";
    czv.className = 'crv cr-out';
    czn.textContent = "We may not be able to deliver here. Call us at (343) 297-2051 and we'll check for you!";
    chips.innerHTML = '';
    return;
  }

  var km = AREA_KM[key];

  if(km > 20){
    czl.textContent = "Outside our delivery zone (" + km + " km away)";
    czv.textContent = "Not available";
    czv.className = 'crv cr-out';
    czn.textContent = "We only deliver within 20km. You're welcome to pick up for free at our Hazeldean Road store!";
    chips.innerHTML = '<span class="cr-chip z5">20km limit exceeded</span>';
    return;
  }

  // Find zone
  var zone = null;
  for(var i=0;i<FEES.length;i++){
    if(km <= FEES[i].max){ zone = FEES[i]; break; }
  }

  var isFree = total >= 150;
  var belowMin = total > 0 && total < zone.min;

  czl.textContent = zone.label + " · approx. " + km + " km from our store";

  if(isFree){
    czv.textContent = "FREE delivery!";
    czv.className = 'crv cr-free';
    czn.textContent = "Your order is over $150 — delivery is on us. Call (343) 297-2051 to place your order.";
    chips.innerHTML = '<span class="cr-chip z1">Free over $150 &#x2713;</span>';
  } else {
    czv.textContent = "$" + zone.fee.toFixed(2) + " delivery fee";
    czv.className = 'crv cr-fee';
    var note = "Minimum order for your zone is $" + zone.min + ".";
    if(belowMin){
      note += " Your current total is $" + total.toFixed(2) + " — add $" + (zone.min - total).toFixed(2) + " more to qualify.";
    } else if(total > 0){
      note += " Order $" + (150 - total).toFixed(2) + " more to unlock FREE delivery!";
    } else {
      note += " Spend $150+ on any order for FREE delivery.";
    }
    czn.textContent = note;
    chips.innerHTML = '<span class="cr-chip ' + (belowMin?'z4':'z2') + '">' + (belowMin ? 'Below minimum order' : 'Qualifies for delivery &#x2713;') + '</span>'
      + '<span class="cr-chip z1">Free at $150+</span>';
  }
}

/* ---- PRODUCT SIZE SELECTOR ---- */
function pickSize(el, price){
  // highlight the chosen size within this product card
  var sizes = el.parentNode.querySelectorAll('.psize');
  sizes.forEach(function(s){ s.classList.remove('active'); });
  el.classList.add('active');
  // update the price shown in this card
  var card = el.closest('.pc');
  var priceEl = card.querySelector('.pp');
  priceEl.textContent = '$' + price;
}

/* ---- MISC ---- */
function showToast(){
  var t=document.getElementById('toast');
  t.classList.add('on');
  setTimeout(function(){t.classList.remove('on');},2000);
}

function subForm(){document.getElementById('fsuc').classList.add('on');}

renderDishes();
renderProducts();
