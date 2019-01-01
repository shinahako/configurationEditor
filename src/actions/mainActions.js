import axios from 'axios';

let nextTodoId = 0;
let initialState = {
  data: {
    "recipes": [
      {
        "id": 1,
        "foodImg": "https://drop.ndtv.com/albums/COOKS/pasta-vegetarian/pastaveg_640x480.jpg",
        "title": "Food title goes here",
        "rating": 5,
        "profileImg": "url('http://www.italianmade.com/ca/wp-content/uploads/2015/05/Rob-Gentile-Buca.jpg')"
      },
      {
        "id": 2,
        "foodImg": "https://drop.ndtv.com/albums/COOKS/corngallery/creolespicedcornthumb_640x480.jpg",
        "title": "Food title goes here",
        "rating": 4,
        "profileImg": "url('http://www.acfindy.org/wp-content/uploads/2013/04/rsz_chef_liz_pictures2015-240x300.jpg')"
      },
      {
        "id": 3,
        "foodImg": "https://cdn.jamieoliver.com/home/wp-content/uploads/2016/06/2.jpg",
        "title": "Food title goes here",
        "rating": 3,
        "profileImg": "url('https://oldtowncrier.files.wordpress.com/2017/01/chef-special-2-17-margaret.jpg')"
      },
      {
        "id": 4,
        "foodImg": "https://drop.ndtv.com/albums/COOKS/chicken-dinner/chickendinner_640x480.jpg",
        "title": "Food title goes here",
        "rating": 4,
        "profileImg": "url('http://www.italianmade.com/ca/wp-content/uploads/2015/05/Rob-Gentile-Buca.jpg')"
      }
    ]
  },
  configurationsMap: [],
  jsonSchemaAndDefaults: [],
  currentConfiguration: ""
};
export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
});

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
});

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

export const initialData = {
  INITIAL_STATE: initialState
};

export const OPEN_RELEVANT_RECIPE = 'OPEN_RELEVANT_RECIPE';
export const openRelevantRecipe = (recipeId) => ({
  type: OPEN_RELEVANT_RECIPE,
  recipeId
});

export const INITIALIZE_CONFIGURATION_DATA_MAP = 'INITIALIZE_CONFIGURATION_DATA_MAP';
export const initializeConfigurationDataMap = (configurationsMap,
    jsonSchemaAndDefaults) => ({
  type: INITIALIZE_CONFIGURATION_DATA_MAP,
  configurationsMap,
  jsonSchemaAndDefaults
});

export const CHANGE_CURRENT_CONFIGURATION_EDIT = 'CHANGE_CURRENT_CONFIGURATION_EDIT';
export const changeCurrentConfigurationEdit = (configName) => (
    {
      type: CHANGE_CURRENT_CONFIGURATION_EDIT,
      configName
    });

export const initializeConfigurationToSchemaMap = () => {

};

export const fetchData = () => {
  return (dispatch) => {
    return axios.all([getDataOfEtl(), getDictionary()])
    .then(axios.spread(function (etlData, dictionary) {
      console.log("etlData", etlData);
      console.log("dictionary", dictionary);

      let etlDataLocal = getEtlLocal();

      console.log("etlDataLocal", etlDataLocal);
      // Both requests are now complete

      let configurationsMap = [];
      let jsonSchemaAndDefaults = [];

      getAllConfigurationGroups(etlDataLocal, configurationsMap);
      createAMapOfJsonSchemaAndDefaults(dictionary, jsonSchemaAndDefaults);
      console.log("configurationsMap", configurationsMap);
      console.log("jsonSchemaAndDefaults", jsonSchemaAndDefaults);
      dispatch(initializeConfigurationDataMap(configurationsMap,
          jsonSchemaAndDefaults));

    }))
    .catch(error => {
      throw(error);
    });
  };
};

function getAllConfigurationGroups(etlData, configurationsMap) {
  if (etlData != null) {
    if (etlData.data.entity != null) {
      for (let key in etlData.data.entity) {
        if (key.includes("Configuration")) {
          configurationsMap[key] = etlData.data.entity[key];
        }
      }
    }
  }
}

function createAMapOfJsonSchemaAndDefaults(dictionary, jsonSchemaAndDefaults) {
  if (dictionary != null) {
    if (dictionary.data.entity != null) {
      let dicEntity = dictionary.data.entity;
      for (let i = 0; i < dicEntity.length; i++) {
        jsonSchemaAndDefaults[dicEntity[i]["enricherName"]] = [];
        jsonSchemaAndDefaults[dicEntity[i]["enricherName"]]["defaultSettings"] = "";
        jsonSchemaAndDefaults[dicEntity[i]["enricherName"]]["jsonSchema"] = "";
        for (let index in dicEntity[i]["links"]) {
          if (dicEntity[i]["links"][index].rel === "Default Settings") {
            jsonSchemaAndDefaults[dicEntity[i]["enricherName"]]["defaultSettings"] = dicEntity[i]["links"][index].href
          }
          else if (dicEntity[i]["links"][index].rel
              === "Default Settings JSON Schema") {
            jsonSchemaAndDefaults[dicEntity[i]["enricherName"]]["jsonSchema"] = dicEntity[i]["links"][index].href
          }
        }

      }
    }
  }
}

function getExistingConfigurationsWithAdditionalData(map, configuration,
    dictionary) {
  if (configuration != null) {
    for (let index in configuration) {
      if (configuration[index]["elementName"] != null) {
        map[configuration[index]["elementName"]] = [];
        map[configuration[index]["elementName"]]["currentConfig"] = []
        map[configuration[index]["elementName"]]["currentConfig"] = configuration[index]["elementSettings"];
        map[configuration[index]["elementName"]]["elementName"] = configuration[index]["elementName"];
        map[configuration[index]["elementName"]]["class"] = configuration[index]["@class"];
        map[configuration[index]["elementName"]]["index"] = index;
      }
    }

  }
}

/*function extractNames(configuration,configurationsMap,dictionary) {
  if (etlData != null) {
    if (etlData.data.entity != null) {
      for (let key in etlData.data.entity) {
        if (key.includes("Name")) {
          configurationsMap[key] = etlData.data.entity[key];
        }
      }
    }
  }
}*/

export function createConfigToSchemaMap(etlName) {
  axios.all([getDataOfEtl(), getDictionary()])
  .then(axios.spread(function (etlData, dictionary) {

    console.log("etlData", etlData);
    console.log("dictionary", dictionary);
    let etlDataLocal = getEtlLocal();
    // Both requests are now complete
    let configurationsMap = [];
    if (etlDataLocal != null) {
      if (etlDataLocal.data.entity != null) {
        for (let key in etlDataLocal.data.entity) {
          if (key.includes("Configuration")) {
            configurationsMap[key] = etlDataLocal.data.entity[key];
          }
        }
      }
    }
    return configurationsMap;
  }));

  /*
  let configurationsMap = [];
  configurationsMap = getDataOfEtl(etlName).then((resEtl) => {
    if (resEtl != null) {
      if (resEtl.entity != null) {
        for (let key in resEtl.entity) {
          if (key.includes("Configuration")) {
            configurationsMap[key] = resEtl.entity[key];
          }
        }
      }
    }
    return configurationsMap;
    console.log("configurationsMap", configurationsMap);
  }).catch(err => console.log("Axios err: ", err));
  
*/
  /*  axios.get("http://etlexporter.vip.qa.ebay.com/v1/enrichers/getAll").then(
        res => {
          if (res.data.entity != null) {
            for (var k in res.data.entity) {
              //console.log(res.data.entity[k].elementName)
  
            }
          }
        }, err => {
          alert("Server rejected response with: " + err);
        });*/
  /*
    return configurationsMap;*/
}

function getDataOfEtl() {
  let etlName = "Comics%20US";
  return axios.get("http://etlexporter.vip.qa.ebay.com/v1/configuration/getActive?etlName="
      + etlName);
}

function getDictionary() {
  return axios.get("http://etlexporter.vip.qa.ebay.com/v1/enrichers/getAll");
}

function getEtlLocal() {
  let json = {
    data: {
      "responseStatus": "SUCCESS",
      "entity": {
        "versionId": "5c2a2e800fdd4d11d7b6a28f",
        "etlName": "Comics US",
        "description": "Auto Default Generator",
        "creationDate": "2018-12-31@14:58:08.371+0000",
        "lastUpdateDate": null,
        "catalog": "664",
        "locale": "EN_US",
        "updatedBy": "Anonymous",
        "status": "ACTIVE",
        "readerConfiguration": {
          "sourceType": "VENDOR_DB_PAIR",
          "additionalReaders": [
            {
              "readerName": "AggregationKeyReader",
              "readerSettings": {
                "vendorDbSchemaName": "gcd",
                "vendorDbTableName": "comics_us_product_agg_key"
              }
            }
          ],
          "readerSettings": {
            "productDataTableName": "EXT_VEND_data",
            "productAttributesTableNAme": "EXT_VEND_ATTRIBUTES",
            "productImagesTableNAme": "ext_vend_images",
            "schemaName": "gcd",
            "vendorName": "GCD",
            "catalogId": "664",
            "locale": "EN_US"
          }
        },
        "dispatcherConfiguration": {
          "dispatcherType": "CRUD",
          "dispatcherSettings": {
            "crudFileMaxProducts": 1000,
            "sourceType": "SDO ETL",
            "sourcingMethod": "ETL",
            "track": "SD ETL",
            "crudAction": "CREATE"
          }
        },
        "enricherConfigurations": [
          {
            "elementName": "NameNormalizationEnricher",
            "elementSettings": {
              "normalizationMap": {
                "series name": "Series Name",
                "type": "Type",
                "title": "Story Titles",
                "display number": "Issue Number",
                "RESERVED_PROVIDER_PRODUCT_IDENTIFIER": "RESERVED_PROVIDER_PRODUCT_IDENTIFIER",
                "feature": "Characters",
                "indicia publisher name": "Indicia Publisher",
                "pencils": "Pencils",
                "price": "Cover Price",
                "gcd year": "Publication Year",
                "RESERVED_PRODUCT_TITLE": "RESERVED_PRODUCT_TITLE",
                "language code": "Language",
                "genre": "Genre",
                "format": "Comics Format",
                "script": "Scripts",
                "volume": "Volume",
                "issue page count": "Number of Pages",
                "publisher country code": "Publisher Country",
                "series country code": "Series Publication Country",
                "brand name": "Cover Brand Name",
                "Alternative Title": "Alternative Title",
                "RESERVED_PRODUCT_IMAGE": "RESERVED_PRODUCT_IMAGE",
                "RESERVED_PRODUCT_DESCRIPTION": "RESERVED_PRODUCT_DESCRIPTION",
                "inks": "Inks",
                "publisher name": "Comics Publihser",
                "gcd date": "Publication Date"
              }
            },
            "@class": "com.ebay.sdo.integ.etl.exporter.webcontracts.productprocessingjob.enrichers.settings.generic.normalization.NameNormalizationEnricherSettingsWeb"
          },
          {
            "elementName": "SimplePatternEnricher",
            "elementSettings": {
              "patterns": [
                {
                  "conditionPropertiesValue": {},
                  "pattern": "664",
                  "propertySettings": []
                }
              ],
              "changedPropertyName": "ebay_catalog_id"
            },
            "@class": "com.ebay.sdo.integ.etl.exporter.webcontracts.productprocessingjob.enrichers.settings.generic.pattern.PatternEnricherSettingsWeb"
          },
          {
            "elementName": "ValueNormalizationEnricher",
            "elementSettings": {
              "propertyNormalizations": [
                {
                  "propertyName": [
                    "Comics Publihser"
                  ],
                  "normalizationMap": {
                    "Rudy McBacon Enterprises": "Rudy McBacon",
                    "Sampson Low, Son, and Marston, Milton House; Leighton, Bros[..]": "Samson Low Son & Marsten",
                    "Ward Makielski": "Independent Publisher",
                    "Raven Publications": "Raven Comics",
                    "Homage; Wizard": "Homage Comics / Wizard",
                    "Marvel; Paragon Software": "Marvel / Paragon Software",
                    "Dark Horse; Acme Comics": "Dark Horse / Acme Comics",
                    "Swappers Quarterly and Almanac [Baily Publishing Co[..]]": "Swappers Quarterly And Almanac / Baily Publishing Co.",
                    "Dynamic Publishing [1990s]": "Dynamic Publishing",
                    "BeÌlier Press": "BeÌlier Press, Inc.; Kitchen Sink Press, Inc.",
                    "Chaos! Comics / Wizard": "Chaos! Comics, Wizard",
                    "Be?lier Press, Inc[..]; Kitchen Sink Press, Inc[..]": "Bélier Press, Inc.; Kitchen Sink Press, Inc.",
                    "Pacifica Pub[..]": "Independent Publisher",
                    "Western": "Western Publishing",
                    "Lightning Comics; Wizard": "Lightning Comics / Wizard",
                    "Zander Cannon": "Independent Publisher",
                    "Brennan Lee Mulligan; Molly Ostertag": "Brennan Lee Mulligan / Molly Ostertag",
                    "Lightning Comics [1990s]": "Lightning Comics",
                    "Pocahontas Fuel Company": "Independent Publisher",
                    "San Francisco Comic Book Company; The Print Mint": "San Francisco Comic Book Company / The Print Mint",
                    "Golfing; McCombs Publishing": "Golfing / Mccombs Publishing",
                    "Kobackers Giftstore of Buffalo, N[..]Y[..]": "Independent Publisher",
                    "Jungle Boy Press; GTK Productions": "Jungle Boy Press / Gtk Productions",
                    "Jon Lewis": "Independent Publisher",
                    "Anthony Smith [independent]": "Independent Publisher",
                    "AAA": "AAA Pop",
                    "AC": "AC Comics",
                    "American Tract Society": "Independent Publisher",
                    "Guideposts Books": "Guideposts Inc.",
                    "thecomic[..]com": "The Comics.Com",
                    "Carroll & Graf": "Carroll & Graf Publishers",
                    "Wizard; Crusade": "Wizard / Crusade",
                    "Archie / Radio Shack Division of Tandy Corp[..]": "Archie Comics",
                    "Bob Ross": "Independent Publisher",
                    "Acclaim": "Acclaim Comics",
                    "C[..]A[..] Jackson & Co[..]; Donaldson Brothers": "American Lithographic Co.",
                    "Robin Snyder and Steve Ditko": "Independent Publisher",
                    "Playboy": "Playboy Press",
                    "Star Publishing [1900s]": "Star Publications",
                    "David King": "Independent Publisher",
                    "American Water Works Association": "Independent Publisher",
                    "Renaissance Comics": "Renaissance Press",
                    "Los Angeles Comic Book Company": "Los Angeles Comic Book Co.",
                    "Titan": "Titan Books",
                    "Kellogg Toasted Cornflake Co[..]": "Kellogg Co.",
                    "Topps; Gareb Shamus Enterprises": "Topps / Gareb Shamus Enterprises",
                    "Copper and Brass Research Association": "Independent Publisher",
                    "MacFadden Books / MacFadden-Bartell Corporation": "Macfadden-Bartell Corporation",
                    "K-Z Comics Group": "KZ Comics",
                    "Maximum Press; Wizard": "Maximum Press / Wizard",
                    "Yankee Publishing Incorporated": "Yankee Publishing",
                    "Legendary": "Legendary Comics",
                    "DC, Marvel": "DC / Marvel",
                    "Billy Graham Evangelistic Association": "Independent Publisher",
                    "Homestead Communications Empire": "Homestead Book Company",
                    "Stone & Thomas": "Independent Publisher",
                    "Association of American Railroads; School and College Service": "Independent Publisher",
                    "David C[..] Cook Publishing Company": "David C. Cook",
                    "Victor Gates": "Independent Publisher",
                    "Modern [1970s]": "Modern Comics",
                    "Tugboat Press; Teenage Dinosaur; Sparkplug Comic Books": "Tugboat Press / Teenage Dinosaur / Sparkplug Comic Books",
                    "SRI Publishing Company / A Sex To Sexty Publication": "Sri Publishing Company",
                    "Sean Fitzgibbon": "Independent Publisher",
                    "Allan Dorison": "Independent Publisher",
                    "Carbon-Based": "Carbon-Based Comics",
                    "Eenieweenie Comics": "Eenie Weenie Comics",
                    "Monica Gallagher": "Independent Publisher",
                    "Nostalgia Inc[..]": "Quality Comics",
                    "Ariel Books; Ballantine Books": "Ariel Books / Ballantine Books",
                    "Ted Valley": "Flint Comix&Entertainment",
                    "National Automobile Dealers Association": "Independent Publisher",
                    "CBS Consumer Publishing": "Unknown Publisher",
                    "Tony Consiglio and Alex Robinson": "Independent Publisher",
                    "Roberts Brothers, University Press: John Wilson & Sons": "Roberts Brothers",
                    "Warner; Little, Brown": "Warner / Little Brown",
                    "Interfaith Publications; T[..]C[..] Comics": "Interfaith Publications / T.C. Comics",
                    "Anti-Defamation League of B'nai B'rith": "Independent Publisher",
                    "Go-Go Comics": "Gogo Comics",
                    "Council for Periodical Distributing Association": "Independent Publisher",
                    "Marvel; Target; Columbia Pictures": "Marvel",
                    "Paul Legrazie Jr": "Independent Publisher",
                    "Price/Stern/Sloan Publishers, Inc[..] [Sawyer Press]": "Price Stern Sloan",
                    "Century Co, The": "The Century Company",
                    "Bungie Software Products Corporation": "Independent Publisher",
                    "Our Sunday Visitor, Inc[..]": "Our Sunday Visitor",
                    "Reader's League Of America": "Independent Publisher",
                    "Aaron Cometbus": "Independent Publisher",
                    "Devil's Due Publishing": "Devil's Due",
                    "Hotel Rueger; Dietz Printing": "Hotel Rueger / Dietz Printing",
                    "Dell, Emerald, Tor Books": "Dell / Emerald / Tor Books",
                    "Dolphin; Doubleday": "Doubleday Publishing Group",
                    "United States Department of Justice": "Independent Publisher",
                    "The Print Mint; Last Gasp": "The Print Mint Inc / Last Gasp",
                    "Chaos! Comics / Comic Cavalcade": "Chaos! Comics, Comic Cavalcade",
                    "Grosset and Dunlap": "Grosset And Dunlap, Inc.",
                    "Street and Smith": "Street & Smith",
                    "Cartoon Books; Wizard": "Cartoon Books, Wizard",
                    "National Dunking Association": "Independent Publisher",
                    "Gold Medal Books": "Fawcett Gold Medal",
                    "Gerona; Special Action Comics": "Gerona",
                    "Alternate Reality Media": "AR Media",
                    "Eclipse / Viz": "Eclipse International, Viz Comics",
                    "Wolf Books": "Wolf Publishing",
                    "American Cancer Society": "Independent Publisher",
                    "Gulf Oil Company": "Independent Publisher",
                    "Farrell": "Ajax-Farrell",
                    "Sig Feuchtwanger": "Independent Publisher",
                    "ABDO Publishing": "ABDO",
                    "Quality Periodicals": "Quality Comics",
                    "Dynamite Entertainment / Wizard Entertainment": "Dynamite Entertainment, Wizard Entertainment",
                    "Susanne Shaver": "Independent Publisher",
                    "Nate Powell [SeeMyBrotherDance]": "Independent Publisher",
                    "Broadsword": "Broadsword Comics",
                    "Marvel; Crusade": "Marvel",
                    "Dark Horse; Warrior Publications": "Dark Horse / Warrior Publications",
                    "Edison Electric Institute": "Independent Publisher",
                    "Clifford Neal": "Independent Publisher",
                    "International Shoe Co[..] [Western Printing]": "International Shoe Co.",
                    "Bantam Spectra Books; Byron Preiss Visual Publications": "Bantam Books",
                    "Samson Comics; Flashpoint Studios": "Samson Comics / Flashpoint Studios",
                    "Triangle Publications (Seventeen Magazine)": "Triangle Publications",
                    "Vantage": "Vantage Press",
                    "DC, Wildstorm, Dynamite Entertainment": "DC / Wildstorm / Dynamite Entertainment",
                    "Rising Sun Stove Polish; Donaldson Brothers": "Donaldson Brothers",
                    "Fox": "Fox Feature Syndicate",
                    "Becky Cloonan and Vasilis Lolos": "Independent Publisher",
                    "JAL Publications": "JAL Publications & Manuscript Press",
                    "Greg Fenton": "Independent Publisher",
                    "Columbia": "Columbia Comics Corporation",
                    "Essankay": "Essankay Publishing Company",
                    "World Famous Periodicals": "World Famous",
                    "M[..] S[..] Dist[..]": "Fox Feature Syndicate",
                    "Lightning Comics [1980s]": "Lightning Comics",
                    "Planet X Productions": "Planet X Comics",
                    "AA² Entertainment": "Aa2 Entertainment",
                    "The Bijou Publishing Empire": "Bijou Publishing Empire",
                    "The Delaware Valley Comicart Consortium": "Independent Publisher",
                    "Modern [1980s]": "Modern",
                    "APAG House Publications Inc[..]": "APAG House Publications",
                    "Gerona; Jay Burtis": "Gerona",
                    "Image (Wildstorm); Marvel": "Image / Marvel",
                    "Kitchen Sink; Top Dollar Comics": "Kitchen Sink Press / Top Dollar Comics",
                    "Pyramid Publications": "Pyramid Books",
                    "Broadway": "Broadway Comics",
                    "Standard": "Standard Comics",
                    "F + W Media": "F+W Media",
                    "Scholastic, Inc[..]": "Scholastic",
                    "Nesbit": "Nesbitt Publishers, Inc.",
                    "Carnal Comics; Opus Graphics": "Opus Graphics",
                    "GrayHaven Comics": "Gray Haven Comics",
                    "American Gas Association": "Independent Publisher",
                    "Dial \"C\" For Comics": "Dial \"\"C\"\" For Comics",
                    "Sinclair Research Laboratories, Inc[..]": "Independent Publisher",
                    "Historical Souvenir Co[..]": "Historical Comics",
                    "MVCreations; Crossgen": "Mvcreations / Crossgen",
                    "Nanny Goat Productions; Last Gasp": "Nanny Goat Productions/Last Gasp",
                    "Daily Mirror Newspapers Ltd[..]": "Daily Mirror",
                    "Dark Horse / DC": "DC / Dark Horse",
                    "Platinum Editions": "Platinum",
                    "Disney Audio Enterntainment": "Disney",
                    "Albert Morse": "Independent Publisher",
                    "Hot Comics International": "Hot Comics",
                    "Valiant Comics": "Valiant",
                    "Captain Silver Syndicate, Inc[..]": "Unknown Publisher",
                    "Malibu; Wizard": "Malibu / Wizard",
                    "The Charles Publishing Co[..]": "Charles Publishing Co., The",
                    "Triangle Sales Company": "Independent Publisher",
                    "Jay S[..] Naylor": "JayNaylor",
                    "Bibo & Lang": "Independent Publisher",
                    "Heroic Publishing": "Heroic Publications",
                    "US Army Medical Department": "U.S. Army",
                    "Angry Viking Entertainment": "Angry Viking Press",
                    "Flash Graphics Productions": "Comics Interview",
                    "Image": "Image Comics",
                    "Townsend National Weekly": "Independent Publisher",
                    "John Porcellino / King-Cat": "John Porcellino",
                    "Comicstories[..]com": "Comicstories",
                    "Houghton Mifflin Harcourt": "Houghton Mifflin Company",
                    "Anson Jew": "Independent Publisher",
                    "Argo Press [1990s]": "Argo Press",
                    "Kickstart Comics Inc[..]": "Kickstart",
                    "Drake Publishers Inc[..]": "Drake Publishers",
                    "B-Line Edutainment": "Independent Publisher",
                    "Stabenfeldt, Inc[..]": "Stabenfeldt",
                    "Bloomsbury Childrens Books": "Bloomsbury Publishing Plc",
                    "Commodore Productions & Artists, Inc[..]": "Unknown Publisher",
                    "Piggy Back Studios": "Piggy Back",
                    "Continuity Comics": "Continuity",
                    "Image Comics and Dynamic Forces": "Image / Dynamic Forces",
                    "Clay Geerdes": "Independent Publisher",
                    "Andor Publishing Co[..]": "Andor Publishing Company",
                    "United States Information Agency": "Independent Publisher",
                    "Campus Crusade for Christ": "Independent Publisher",
                    "Eclipse / Quality": "Eclipse Comics",
                    "Harris / Wizard": "Harris Comics / Wizard",
                    "Astonish Comics": "Astonish Factory, Inc.",
                    "Quebecor Printing (Ronalds)": "Independent Publisher",
                    "Dark Horse, Hero Illustrated": "Dark Horse / Hero Illustrated",
                    "Middlesex News, The": "The Middlesex News",
                    "Pomegranate Press, Ltd[..]": "Pomegranate Press",
                    "Aardvark Global Publishing Company": "Boxcar Comics",
                    "Fogelcomix/LCD": "Fogelcomix",
                    "W[..] R[..] Allman": "Viliant / Wizard",
                    "The Rosenbaum Group, Inc[..]": "The Rosenbaum Group",
                    "Columbia University Press; Harvey Publications": "Columbia University Press / Harvey Publications",
                    "Chrysler Motors Corporation": "Independent Publisher",
                    "Jim Starlin [Self-Publisher]": "Independent Publisher",
                    "Frederic Ray": "Independent Publisher",
                    "Pennsylvania Department of Transportation": "Independent Publisher",
                    "ConAgra Frozen Foods": "Independent Publisher",
                    "Peter S[..] Conrad": "Independent Publisher",
                    "Becky Cloonan": "Independent Publisher",
                    "Kellogg's": "Kellogg Co.",
                    "Cherry Comics; Tundra Publications": "Cherry Comics / Tundra Publications",
                    "Picture Story": "Picture Story Publications",
                    "Damion Kendrick": "Independent Publisher",
                    "Kenzer and Company": "Kenzer & Company",
                    "Gerona; Top Spot Publishing Co[..]": "Gerona",
                    "Holyoke; Narrative": "Holyoke / Narrative",
                    "Revival Fires International": "Revival Fires",
                    "Acclaim / Dark Horse": "Valiant Comics, Dark Horse",
                    "Nox'Em All Shoes; Kaufmann & Strauss Co[..]": "Independent Publisher",
                    "Action Text, Inc": "Action Text",
                    "Houghton Mifflin": "Houghton Mifflin Company",
                    "Archie": "Archie Comics",
                    "T[..] Hersom & Co[..]'s \"Best\" Soap and Italian Sapone; Kaufmann & Strauss Co[..]": "T. Hersom & Co.'s \"\"Best\"\" Soap and Italian Sapone; Kaufmann & Strauss Co.",
                    "Malibu; Marvel": "Malibu / Marvel",
                    "Enslow Publishers, Inc[..]": "Enslow Publishers",
                    "Northwest Comics": "Independent Publisher",
                    "Eclipse / Turtle Island": "Eclipse/Turtle Island",
                    "Remington Arms Company Inc[..]; Dupont": "Remington / Dupond",
                    "Braden D[..] Lamb": "Independent Publisher",
                    "Mushroom; Mystic; Morning Star": "Mushroom Comics",
                    "Association Against the Prohibition Amendment": "Independent Publisher",
                    "Toon Art, Inc[..] ; Questmark Inc[..]": "Toon Art, Inc. / Questmark Inc.",
                    "Crusade/ Marvel": "Marvel",
                    "American Magazine": "Crowell-Collier",
                    "Newsday, Inc[..]": "Newsday",
                    "PictureBox": "PictureBox, Inc.",
                    "Keystone Entertainment Doubleeye Studios": "Keystone Entertainment / Doubleeye Studios",
                    "Art & Soul / Mark's Giant Economy Sized Comics": "Art & Soul",
                    "Superior Reprints / Military Service Publishing Co[..]": "Military Service Publishing Co.",
                    "River City Publications": "River City Comics",
                    "Puppet Terrors": "Puppet Terrors Press",
                    "I[..] W[..] Publishing / Super Comics": "I. W. Publishing",
                    "Bryan Fowler": "Independent Publisher",
                    "Pelican Publications (Funnies, Inc[..])": "Pelican Publications",
                    "Arm & Hammer Brand": "Independent Publisher",
                    "Bluewater Productions": "Bluewater",
                    "Fool Proof Art": "Independent Publisher",
                    "Richfield Boron": "Independent Publisher",
                    "Tom Eagan": "Independent Publisher",
                    "Dark Horse; Wizard": "Dark Horse / Wizard",
                    "Dirty Hand Media": "Independent Publisher",
                    "Henry Altemus": "Henry Altemus Company",
                    "US Department of Health, Education and Welfare": "US Department of Health",
                    "Bongo": "Bongo Comics Group",
                    "Promethean Press": "Promethean Studios",
                    "Big Entertainment; C[..]P[..] Group": "Big Entertainment",
                    "Pastime Productions": "Pastime Publications",
                    "East Village Other": "The East Village Other",
                    "U[..]P[..] Comics": "U.P. Comics, Inc.",
                    "Promethean Enterprises": "Promethean Studios",
                    "Pinnacle Books": "Pinnacle Book",
                    "Royal Academy of Illustration & Design": "Independent Publisher",
                    "Joe Venegas, Creative Talent Communications, Inc[..]": "Joe Venegas / Creative Talent Communications, Inc.",
                    "Novela Health Education": "Independent Publisher",
                    "DC; Dynamite Entertainment": "DC / Wildstorm / Dynamite Entertainment",
                    "Richard V[..] Corben": "Independent Publisher",
                    "Hallden; Fawcett": "Hallden / Fawcett",
                    "Class Enterprises": "Class Comics",
                    "Big Bang": "Big Bang Comics",
                    "Boston: Robert Brothers; University Press: John Wilson and Son": "Independent Publisher",
                    "Vintage Features": "Viliant / Wizard",
                    "Celebrated Cartoon Service, Inc,": "Unknown Publisher",
                    "Crazyfish / MJ-12": "Unknown Publisher",
                    "Le Salon Graphics": "Independent Publisher",
                    "Kitchen Sink Press; Wizard": "Kitchen Sink Press / Wizard",
                    "I[..] W[..] Publishing; Super Comics": "I. W. Publishing",
                    "Alternative Comics": "Independent Publisher",
                    "National Crime Prevention Council": "Independent Publisher",
                    "American Visuals Corporation": "Independent Publisher",
                    "Biljo White": "Independent Publisher",
                    "Planters Nut & Chocolate Company": "Independent Publisher",
                    "Kilian Barracks": "Kilian Barracks Free Press",
                    "Dolphin / Doubleday": "Doubleday Publishing Group",
                    "Dark Horse; Topps": "Dark Horse / Topps",
                    "Bloody Wymmin": "Bloody Wymmin Comix",
                    "People Of Color Against AIDS Network (POCAAN)": "Independent Publisher",
                    "Matt Bors": "Matt",
                    "Ivory Tower": "Ivory Tower Publishing",
                    "Novelty / Premium / Curtis": "Novelty Press",
                    "Roberts Brothers, Boston": "Roberts Brothers",
                    "Aced / CA Comics": "Aced Comics",
                    "American Iron & Steel Institute": "Independent Publisher",
                    "Vortex": "Vortex Comics",
                    "Allis-Chalmers Manufacturing Company": "Johnstone & Cushing",
                    "Dynamic Publications [1940s] [Chesler]": "Dynamic Publications",
                    "WCG Comics": "WCG",
                    "Angel Comics": "Angel Entertainment Inc.",
                    "Dan Wright & Tom Spurgeon": "Independent Publisher",
                    "Wilson Publishing Company": "Wilson Publishing",
                    "Graphic Books / Graphic Publishing Company Inc": "Graphic Books",
                    "Armed Services Edition": "Independent Publisher",
                    "Topps; Byron Preiss": "Topps / Byron Preiss Visual Publications",
                    "Vaughn Bode": "Vaughn Bodē",
                    "James Bond 007 Fan Club, The": "The James Bond 007 Fan Club",
                    "Public Services International": "Independent Publisher",
                    "Northwest": "Northwest Press",
                    "Smithsonian Institution / New College Press": "Independent Publisher",
                    "G[..]C[..] Murphy": "Independent Publisher",
                    "Lightning Comics [1960s]": "Lightning Comics",
                    "Tom P[..] Gasparotti; R[..]T[..] Reece; Hector Tellez; Larry Todd": "Independent Publisher",
                    "Louisiana Leisure Print Distributors": "Louisiana Leisure",
                    "American Dental Association": "Independent Publisher",
                    "Good Comics Inc[..] [1950s]": "Good Comics Inc.",
                    "Tribune Media Services, Inc[..]": "Rabbit Hole",
                    "McLoughlin Bros[..]": "McLoughlin",
                    "Oktomica": "Oktomica Comics",
                    "Porter Mason": "Independent Publisher",
                    "Poochie Press": "Poochie Press Publications",
                    "Tim Gordon": "Tampa Comiccon Comics",
                    "Brookwood": "Brookwood Publications",
                    "Colonial Williamsburg Foundation": "Independent Publisher",
                    "First Light Entertainment": "Firstlight Publications",
                    "Cities Service Oil Co[..]": "Independent Publisher",
                    "Blackthorne Publishing, Inc[..]": "Blackthorne",
                    "Reed": "Gary Reed",
                    "Dark Horse, Top Cow": "Dark Horse / Top Cow",
                    "John Blackburn": "Eros Comix",
                    "Known Associates / Amazing Montage": "Known Associates Press",
                    "Export Newspaper Service": "Independent Publisher",
                    "Keppler & Schwarzmann; Press of Puck": "Keppler & Schwarzmann / Press Of Puck",
                    "Ajax Comics": "Ajax-Farrell",
                    "DC, Gareb Shamus Enterprises": "DC Comics / Gareb Shamus Enterprises",
                    "Morning Star Press, The": "The Morning Star Press",
                    "Image; Wizard": "Image / Wizard",
                    "Authentic Publications": "Unknown Publisher",
                    "General Comics": "General Comics, Inc.",
                    "DC; Harris Comics": "DC / Harris Comics",
                    "DC, Wizard": "DC / Wizard",
                    "T[..]F[..]H[..] Publications": "T.F.H. Publications, Inc",
                    "Glen D[..] Johnson": "Unknown Publisher",
                    "Dynamite Entertainment; Wizard Entertainment": "Dynamite Entertainment, Wizard Entertainment",
                    "First Second": "First Second Books",
                    "Federal Reserve Bank Of New York": "Independent Publisher",
                    "Marvel / Gareb Shamus Enterprises [Wizard Entertainment]": "Marvel / Wizard",
                    "Aardvark-Vanaheim / Renegade Press": "Aardvark-Vanaheim, Renegade Press",
                    "Little, Brown": "Little, Brown & Co.",
                    "Zen/Archie": "Zen / Archie",
                    "Prentice Hall": "Prentice Hall Press",
                    "Rosen Publishing Group, Inc[..]": "Rosen Publishing",
                    "Highwater Books/Alterhative Comics": "Highwater Books / Alterhative Comics",
                    "Cinema Shares International Distribution Corp[..]": "Cinema Shares International Distribution",
                    "Republican National, Congressional & Senatorial Committees; Graphic Information Service": "Graphic Information Service Inc",
                    "Ominous Press; Wizard": "Ominous Press / Wizard",
                    "Sparkplug Books; Floating World Comics; Snakebomb Comix; Teenage Dinosaur": "Sparkplug Books / Floating World Comics / Snakebomb Comix / Teenage Dinosaur",
                    "Magnolia Petroleum Company; Mobilgas; Mobiloil": "Texas State Historical Association",
                    "Pond's Extract Co[..]": "Independent Publisher",
                    "Amazing": "Amazing Comics",
                    "Shadow Press (US)": "Shadow Press",
                    "Bruce Chrislip": "Independent Publisher",
                    "Candar": "Candar Publishing Co., Inc.",
                    "Dark Horse, DC Comics": "DC / Dark Horse",
                    "Eclipse; Acme Press": "Eclipse, Acme Press",
                    "Tim Piotrowski": "Glitchworks",
                    "Wanted Comics Group; Toytown; Patches": "Orbit Comics",
                    "Valiant ; Wizard": "Viliant / Wizard",
                    "John Porcellino and Joe Chiappetta": "ohn Porcellino / Joe Chiappetta",
                    "Baily Publishing Co[..] [1940s]": "Baily Publishing Co.",
                    "Baritonios LLC, The": "Independent Publisher",
                    "Alec Longstreth": "Independent Publisher",
                    "TADCORPS; Custom Comic Services": "Tadcorps / Custom Comic Services",
                    "WBEZ Alliance": "WBEZ Alliance, Inc",
                    "Chaos! Comics; Wizard": "Chaos! Comics, Wizard",
                    "Henry M[..] Jackson Foundation for the Advancement of Military Medicine": "Independent Publisher",
                    "Kitchen Sink; DC": "Kitchen Sink Press / DC",
                    "Fireman Press": "Fireman Press Ltd",
                    "Eric Skillman": "Independent Publisher",
                    "Russ Gibb Productions": "Print Mint",
                    "Crown Publishers": "Black Swan Press",
                    "Bullet": "D.C. Thomson",
                    "SZ": "Anthony Smith [independent]",
                    "Cartoonists Co-Op Press": "Cartoonists Co-op",
                    "DC, Image": "DC / Image",
                    "Advertising Office, State Highway Commission of Montana": "Independent Publisher",
                    "Mirage": "Mirage Studios",
                    "P[..]A[..]W[..]S[..] Print, Inc[..] (Personal Awareness With Spooky)": "Paw Prints",
                    "U[..] S[..] Camera": "U. S. Camera Publication",
                    "General Electric Company; King Features": "General Electric Company / King Features",
                    "B Antin": "Orbit Comics",
                    "Marvel; DC": "Marvel / DC",
                    "Pioneer": "Pioneer Books Inc.",
                    "John Oster Manufacturing Co[..]": "John Oster Mfg. Co.",
                    "Aardvark-Vanaheim and Renegade Press": "Aardvark-Vanaheim, Renegade Press",
                    "Malibu; Semic International": "Malibu / Semic International",
                    "United States Army": "U.S. Army",
                    "Blue Star": "Blue Star Publishing",
                    "Eclipse; Turtle Island": "Eclipse/Turtle Island",
                    "DC, United States Postal Service": "DC / United States Postal Service",
                    "Spotlight Publishers [1940s]": "Spotlight Publishers",
                    "A[..]D[..] Vision": "A.D. Vision, Inc.",
                    "San Francisco AIDS Foundation": "Independent Publisher",
                    "CrossGen; Gareb Shamus Enterprises [Wizard Entertainment]": "CrossGen / Gareb Shamus Enterprises [Wizard Entertainment]",
                    "El Capitán": "El Capitan",
                    "Harborview Injury Prevention & Research Center and the Washington Bicycle Helmet Coalition": "Independent Publisher",
                    "Tribune Publishing Company": "Tribune Publishing",
                    "Basement": "Basement Comics",
                    "C&T Graphics": "C&T Graphics Publication",
                    "DC, Con Edison": "DC / Con Edison",
                    "Brandon Hanvey": "Independent Publisher",
                    "Elliot": "Elliott",
                    "Heavy Metal; Kitchen Sink": "Heavy Metal / Kitchen Sink",
                    "Anything But Monday": "Independent Publisher",
                    "Scott Mills": "Independent Publisher",
                    "Pomegranate Communications, Inc[..]": "Pomegranate Press",
                    "Kilgore Comics": "Kilgore",
                    "Solvent Abuse Foundation for Education": "Independent Publisher",
                    "Curtis Books": "Curtis Comic",
                    "First": "First Comics",
                    "Braswell Drinks": "Independent Publisher",
                    "Truth": "Truth Comic",
                    "Maximum Press; Warrior Publications": "Maximum Press / Warrior Publications",
                    "The Handcraft Guild": "Cannon",
                    "Crossgen / Gareb Shamus Enterprises, Inc[..] / Wizard": "Crossgen , Gareb Shamus Enterprises, Inc., Wizard Entertainment",
                    "Takara; Sord": "Independent Publisher",
                    "Dark Horse; Digital Manga Publishing": "Dark Horse / Digital Manga Publishing",
                    "Murray Comics (Murray Publishers Pty Ltd)": "Murray Publishing Company / Murray Publishers Pty Ltd",
                    "Darkchylde Entertainment; Wizard": "Darkchylde Entertainment / Wizard",
                    "Penny King Company": "Independent Publisher",
                    "Rex Publishing Company": "Rex Publishing",
                    "Novelle": "Nouvelle",
                    "Contraband": "Contraband Comics",
                    "Girl Scouts of the U[..]S[..]A[..]": "Independent Publisher",
                    "Fantagraphics": "Fantagraphics Books",
                    "Action Lab Comics": "Action Lab Entertainment",
                    "Ben Lichius": "Independent Publisher",
                    "Now": "NOW Comics",
                    "D[..]M[..]S[..] Enterprises": "Independent Publisher",
                    "Bailey Enterprises [1950s]": "Bailey Enterprises",
                    "Smithsonian Institution / Harry N Abrams": "Independent Publisher",
                    "David Lasky": "Independent Publisher",
                    "Commerce and Industry Commission-Cheyenne, Wyoming": "Independent Publisher",
                    "Hearst Magazines": "Hearst Corporation",
                    "A Fine Line Press": "A Fine Line",
                    "H L Baker": "H.L. Baker",
                    "American Bankers Association, N[..]Y[..]": "Independent Publisher",
                    "Cheri Magazine, Inc[..]": "Cheri Magazine",
                    "Great American Comics; Peter George Four Star Publication; American Features Syndicate": "Great American Comics",
                    "Milrose Publishing Co": "Milrose Publishing",
                    "Comic Book Legal Defense Fund": "Independent Publisher",
                    "Tom Foster": "Marvel",
                    "New England Comics": "New England Comics (NEC)",
                    "Brian Babendererde": "Independent Publisher",
                    "Turkish Information Office": "Independent Publisher",
                    "Educational Aids of Long Beach": "Independent Publisher",
                    "Angel Entertainment": "Angel Entertainment Inc.",
                    "Walt Disney Productions": "Disney",
                    "Newspaper Enterprise Association": "Newspaper Enterprise Association, Inc.",
                    "Heavy Metal; Tundra Publishing Ltd[..]": "Heavy Metal / Tundra",
                    "Our Publishing Co[..]; Toytown; Patches": "Orbit Comics",
                    "Crusade; Marvel": "Marvel",
                    "Black Watch": "Blackwatch",
                    "HBO Video": "HBO",
                    "Peter Fay": "Unknown Publisher",
                    "Fantagraphics Books, Inc[..] / Prison Sentences": "Fantagraphics Books / Prison Sentences",
                    "Saddleback Educational Publishing": "Saddleback Educational",
                    "European Pictures Pub[..]": "Independent Publisher",
                    "Conventual Franciscans of Marytown": "Independent Publisher",
                    "Eclipse / Acme Press": "Eclipse, Acme Press",
                    "Mike Barrier": "Independent Publisher",
                    "DC; Wizard": "DC / Wizard",
                    "American Media": "Demand Media, Inc",
                    "DC; Wildstorm; Dynamite Entertainment": "DC / Wildstorm / Dynamite Entertainment",
                    "PETA": "Peta comics",
                    "Promotional Publications": "Independent Publisher",
                    "Planet-X-Productions": "Planet X Comics",
                    "D[..]S[..] Publishing": "DS Publishing",
                    "Bud Plant": "Diamond Comics Distributors",
                    "US Army Armor School": "U.S. Army",
                    "Ansis Purins": "Independent Publisher",
                    "Shiver Bones Group, The": "The Shiver Bones Group",
                    "Warm Neck": "Warm Neck Funnies",
                    "Paul Facchetti Publications, Paris": "Independent Publisher",
                    "Ringen Stove Co[..]; Kaufmann & Strauss Co[..]": "Ringen Stove Co. / Kaufmann & Strauss Co.",
                    "Topps; Wizard": "Topps / Wizard",
                    "Larry Edge": "Independent Publisher",
                    "Nicola Cuti; Moonchild Productions": "Independent Publisher",
                    "Faultline Press": "Independent Publisher",
                    "National Association of Conservation Districts": "Independent Publisher",
                    "Inner City AIDS Network, Washington, DC": "Inner City AIDS Network",
                    "Eclipse; Viz": "Eclipse International, Viz Comics",
                    "Digital Manga": "Digital Manga Publishing",
                    "Good Comics [1990s]": "Good Comics",
                    "Kim Rehr Productions": "Kim-Rehr Productions",
                    "Hastings Associates": "Warren",
                    "Guild, The": "Dark Horse",
                    "Star Publications [1949-1954]": "Star Publications",
                    "Top Cow; Marvel; Wizard": "Top Cow / Marvel / Wizard",
                    "Sirius Entertainment; Wizard": "SIRIUS Entertainment / Wizard",
                    "Oral Roberts Evangelical Association": "Independent Publisher",
                    "Locust Moon Press": "Locust Moon Comics",
                    "Hall Syndicate": "Independent Publisher",
                    "Elliot Publishing Co": "Elliott",
                    "Ron Graham": "Independent Publisher",
                    "Meadowbrook": "Meadowbrook Publishing Inc.",
                    "Heroic Fantasy Publications": "Heroic Publications",
                    "Sisters of Loretto": "Unknown Publisher",
                    "Spotlight Comics [1980s]": "Spotlight Comics",
                    "Artis Studios / Wizard": "Artis Studios, Wizard",
                    "BVBooks": "BV Books",
                    "Top Cow; Wizard": "Top Cow / Wizard",
                    "Aardvark-Vanaheim , Renegade Press": "Aardvark-Vanaheim, Renegade Press",
                    "Presbyterian Publishing Corporation": "Independent Publisher",
                    "Pioneer Take Out Corporation": "Independent Publisher",
                    "Abstract Studio; Wizard": "Abstract Studio / Wizard",
                    "Larry Fuller Presents": "Larry Fuller",
                    "Fictioneer Books, Ltd[..]": "Comics Interview Publications",
                    "unknown": "Unknown Publisher",
                    "215 Ink[..]": "215 Ink",
                    "Ceridian Corporation, Military OneSource": "Ceridian Corporation / Military OneSource",
                    "Baby's First Book Club": "Unknown Publisher",
                    "American Insurance Association": "Independent Publisher",
                    "oddtruth": "Odd Truth Inc.",
                    "Pak Man Productions; 10 Print JoCo": "Pak Man Productions / 10 Print JoCo",
                    "Performing Arts Social Society, Inc[..]": "Performing Arts Social Society",
                    "American Innerspring Manufacturers": "Independent Publisher",
                    "?ddtruth": "Odd Truth Inc.",
                    "Ariel Bordeaux": "Independent Publisher",
                    "Fellowship of Reconciliation": "Independent Publisher",
                    "Axis Comics; Hero Illustrated": "Axis Comics / Hero Illustrated",
                    "Event Comics, Wizard": "Event Comics / Wizard",
                    "2D Cloud": "2dcloud",
                    "James Kochalka": "James Kochalka Superstar",
                    "Marvel; Fireside Books": "Marvel / Simon & Schuster",
                    "Max C[..] Gaines [Phillip's Dental Magnesia]": "Permission Of Percy Crosby",
                    "Prize": "Prize Comics",
                    "Eclipse; Quality": "Eclipse Comics",
                    "High-Top and Brinke Stevens": "High-Top",
                    "Austintatious, Inc[..]": "Austintatious Comics",
                    "Mike Luckas": "Independent Publisher",
                    "Xerox Education Publications; Xerox Corporation": "Xerox Education Publications",
                    "Baily Publishing Company": "Baily Publishing Co.",
                    "Wendy's Restaurants": "Wendy's International, Inc",
                    "Power Publishing Company": "Power Comics Company",
                    "AA2 (squared) Entertainment": "Aa2 Entertainment",
                    "Cultural Institute for the Vedic Arts": "Independent Publisher",
                    "Millennium; Comico": "Millennium / Comico",
                    "Ajax; Farrell": "Ajax-Farrell",
                    "Aw Yeah Comics! Publishing": "Aw Yeah Comics Publishing",
                    "School Of Visual Arts": "Independent Publisher",
                    "Warner Home Video": "Warner Bros. Records",
                    "Candar Publishing": "Candar Publishing Co., Inc.",
                    "Narrative": "Independent Publisher",
                    "Airplane/Anders Brekhus Nilsen": "Independent Publisher",
                    "Basement Comics and Explorer Press": "Basement Comics / Explorer Press",
                    "Image; Hero Illustrated": "Image / Hero Illustrated",
                    "Mr[..] John Rickaby; Strobridge Lith Co": "Mr. John Rickaby / Strobridge Lith Co",
                    "United Plankton Pictures, Inc[..]": "United Plankton Pictures",
                    "Graphic, The": "Independent Publisher",
                    "Association of American Railroads": "Independent Publisher",
                    "Pentagon Publishing Co[..]": "Independent Publisher",
                    "Andrew Goldfarb": "Independent Publisher",
                    "Lorne-Harvey": "Harvey",
                    "Pyramid Productions": "Pyramid Comics",
                    "Bootleg Brothers": "Bootleg Comics",
                    "Democratic National Committee": "Independent Publisher",
                    "Dynasty Presentations, Inc[..]": "Dynasty Presentations",
                    "45th Division News": "Independent Publisher",
                    "Virginia Edition": "The Virginia Edition",
                    "benvsdov[..]com": "Ben Vs. Dov",
                    "Half-Assed Press": "Half-Ass Press",
                    "Douglas Communications Corp[..]": "Independent Publisher",
                    "Black Swan Comics": "Black Swan Press",
                    "FantaCo Enterprises / Tundra": "Fantaco Enterprises, Tundra",
                    "Event Comics; Wizard": "Event Comics / Wizard",
                    "Vital Publications": "Vital Publications, Inc.",
                    "Walter T[..] Foster": "Walter Foster Publishing",
                    "Todd Webb": "Unknown Publisher",
                    "R[..]S[..] Cavey": "Independent Publisher",
                    "Yentzer and Gonif": "Yentzer and Gonif Comic Production",
                    "Antarctic Press": "Independent Publisher",
                    "R[..] Worthington": "Independent Publisher",
                    "Comic Art Publishing": "Comic Art Publishers",
                    "Hiscox & Co[..]; Giles Lith[..] Co[..]": "Independent Publisher",
                    "Geo[..] M[..] Hayes; Bradley & Alling Printers": "Independent Publisher",
                    "Virgin": "Virgin Comics",
                    "Fleetway/Quality": "Fleetway / Quality",
                    "Polaroid Corporation": "Independent Publisher",
                    "Neat Guys With Bad Karma": "Independent Publisher",
                    "Belda Record & Publ[..] Co[..]": "Belda Record",
                    "Cross Plains Comics / Pen And Ink": "Cross Plains Comics, Pen And Ink",
                    "Peta comics": "Peta",
                    "Electro Brain Corp[..]": "Electro Brain",
                    "Interplay, Inc[..]": "Interplay",
                    "Marshall Comics Incorporated": "Marshall Comics",
                    "Premium Sales, Inc[..]": "Independent Publisher",
                    "Seaboard": "Atlas Comics",
                    "Post-Hall Syndicate": "Independent Publisher",
                    "Raven Gregory": "Independent Publisher",
                    "DC, Malibu": "DC / Malibu",
                    "Buster Brown Stocking Company": "Independent Publisher",
                    "National Fire Protection Association": "Independent Publisher",
                    "Bob Boze Bell": "Independent Publisher",
                    "General Electric Company": "Independent Publisher",
                    "American Red Cross": "Independent Publisher",
                    "Greg Mayer": "Independent Publisher",
                    "Aspen MLT, Inc": "Aspen",
                    "True Comics Press Corporation": "True Comics Press",
                    "Chicago Nite Life News": "Unknown Publisher",
                    "Les Editions R[..]G[..]B[..] ENRG; Quebec Comics": "Les Editions R.G.B. Enrg / Quebec Comics",
                    "General Motors": "Independent Publisher",
                    "American Philatelic Society; Custom Comic Services": "Custom Comic Services",
                    "United States Treasury": "Independent Publisher",
                    "US Department of Health and Human Services": "US Department of Health",
                    "Zenescope Entertainment": "Zenescope",
                    "Aquarium Pharmaceuticals, Inc[..]": "Aquarium Pharmaceuticals",
                    "Comics U[..]S[..]A[..]": "Marvel",
                    "Adrian Tomine": "Independent Publisher",
                    "A Wave Blue World": "A Wave Blue World, Inc.",
                    "Vestal Press, The": "Vestal Press",
                    "Pioneer Entertainment (USA), L[..]P[..]": "Pioneer Books Inc."
                  }
                },
                {
                  "propertyName": [
                    "Genre"
                  ],
                  "normalizationMap": {
                    "Adul": "Adult",
                    "Psychology": "Psychology",
                    "Civil Rights": "Historical",
                    "Fumetti": "Fumetti",
                    "Activity": "Activity",
                    "Cartoon": "Cartoon",
                    "Prehistoric": "Prehistoric",
                    "Dream": "Dream",
                    "Western": "Western",
                    "Marital Arts": "Martial Arts",
                    "Celebrity": "Celebrity",
                    "Fairy Tale": "Fantasy",
                    "Advertisement": "Information",
                    "Tumor": "Tumor",
                    "Poetry": "Poetry",
                    "Contest": "Contest",
                    "Occult": "Occult",
                    "Television Adapation": "Television Based",
                    "Horror|Science Fiction": "Horror|Science Fiction",
                    "Satire-parody": "Satire-parody",
                    "Cosmic": "Cosmic",
                    "School Life": "School Life",
                    "Chilidren": "Children",
                    "Horror-suspense": "Horror-suspense",
                    "Humor Adventure": "Humor/Satire",
                    "Virus": "Virus",
                    "Patriotic": "Patriotic",
                    "Shonen": "Shonen",
                    "Animal": "Animal",
                    "Crime": "Crime/Detective",
                    "Jungle": "Jungle",
                    "Psychodrama": "Psychodrama",
                    "Medical": "Medical",
                    "Political": "Political",
                    "Fiction": "Fiction",
                    "Slice Of Life": "Slice Of Life",
                    "Drugs": "Drugs",
                    "Martial Arts": "Martial Arts",
                    "Sword And Sorcery": "Fantasy",
                    "No Genre": "No Genre",
                    "Gags": "Humor/Satire",
                    "Post Apocalypse": "Post Apocalypse",
                    "Suspense": "Suspense",
                    "Pulp": "Pulp",
                    "Science Fiction": "Science Fiction",
                    "Television Based": "Television Based",
                    "Magical Girl": "Magical Girl",
                    "Advocacy": "Advocacy",
                    "Barbarian": "Fantasy",
                    "Weird": "Weird",
                    "Monster": "Monster",
                    "True Story": "True Story",
                    "Adult": "Adult",
                    "Mystery": "Mystery",
                    "Jungle Historical": "Jungle Historical",
                    "Tv Comedy": "Television Based",
                    "Military": "Military",
                    "Nature": "Nature",
                    "Classics": "Classics",
                    "Seinen": "Seinen",
                    "Fashion": "Fashion",
                    "Educational": "Information",
                    "Allegory": "Allegory",
                    "Detective": "Detective",
                    "Pin-Up": "Pin-Up",
                    "Tragedy": "Tragedy",
                    "Facts": "Facts",
                    "Superhero": "Superhero",
                    "Promo": "Information",
                    "Puzzle": "Puzzle",
                    "Cyberpunk": "Cyberpunk",
                    "Holiday": "Holiday",
                    "Music": "Music",
                    "Family": "Family",
                    "Red Scare": "Historical",
                    "Literary": "Literary",
                    "American Indian": "Western",
                    "Anthropomorphic-funny Animals": "Funny Animal",
                    "Racism": "Political",
                    "Real Fact": "Information",
                    "Jdventure": "Adventure",
                    "Autobiography": "Biography",
                    "Humor/Satire": "Humor/Satire",
                    "Illustration": "Illustration",
                    "Mecha": "Mecha",
                    "Alcohol": "Alcohol",
                    "Soap": "Soap",
                    "Action/Adventure": "Action/Adventure",
                    "Hentai": "Hentai",
                    "Josei": "Josei",
                    "Hobby": "Hobby",
                    "Crime/Detective": "Crime/Detective",
                    "Math & Science": "Science",
                    "Shojo": "Shojo",
                    "Spy": "Spy",
                    "Sports": "Sports",
                    "Army": "Army",
                    "Ku Klux Klan": "Historical",
                    "Romance": "Romance",
                    "TRUE": "True Story",
                    "Detective-mystery": "Detective",
                    "Television Adaptaion": "Television Based",
                    "DramaDrama": "Drama",
                    "Drama": "Drama",
                    "Car": "Car",
                    "Games": "Games",
                    "Fantasy": "Fantasy",
                    "Air Force": "Air Force",
                    "Philosophy": "Philosophy",
                    "Action": "Action/Adventure",
                    "Aviation": "Aviation",
                    "Bad Girl": "Bad Girl",
                    "Science": "Science",
                    "War": "War",
                    "Review": "Review",
                    "Information": "Information",
                    "Audlt": "Audlt",
                    "Science Fictioon": "Science Fiction",
                    "Movie Adaptation": "Movie Adaptation",
                    "Biography": "Biography",
                    "Folklore": "Folklore",
                    "Children": "Children",
                    "Western-frontier": "Western-frontier",
                    "Teen": "Teen",
                    "Adaptation": "Movie Adaptation",
                    "N/a": "No Genre",
                    "Adventure": "Adventure",
                    "Horror": "Horror",
                    "Advertisment": "Information",
                    "Good Girl": "Good Girl",
                    "Magic": "Fantasy",
                    "Humot": "Humor/Satire",
                    "Frontier": "Adventure",
                    "Underground": "Underground",
                    "Gothic": "Gothic",
                    "Marines": "Marines",
                    "Humor": "Humor/Satire",
                    "Post-apocalypse": "Post Apocalypse",
                    "Noir": "Noir",
                    "Navy": "Navy",
                    "Addiction": "Medical",
                    "Religious": "Religious",
                    "Pirate": "Pirate",
                    "Satire": "Satire",
                    "Propaganda": "Propaganda",
                    "Supernatural": "Supernatural",
                    "Vampire": "Vampire",
                    "Funny Animal": "Funny Animal",
                    "Historical": "Historical",
                    "Manga": "Manga"
                  }
                },
                {
                  "propertyName": [
                    "Language"
                  ],
                  "normalizationMap": {
                    "Castilian": "Spanish",
                    "de": "German",
                    "no": "Norwegian",
                    "Italian": "Italian",
                    "Bosnian": "Bosnian",
                    "ru": "Russian",
                    "Russian": "Russian",
                    "pt": "Portuguese",
                    "Hebrew": "Hebrew",
                    "Serbian": "Serbian",
                    "German": "German",
                    "fr": "French",
                    "hy": "Armenian",
                    "bs": "Bosnian",
                    "por": "Portuguese",
                    "French": "French",
                    "Portuguese": "Portuguese",
                    "Esperanto": "Esperanto",
                    "Spanish": "Spanish",
                    "Norwegian": "Norwegian",
                    "sr": "Serbian",
                    "Castellano": "Spanish",
                    "Armenian": "Armenian",
                    "Cherokee": "Cherokee",
                    "Bulgarian": "Bulgarian",
                    "en": "English",
                    "Korean": "Korean",
                    "eo": "Esperanto",
                    "Welsh": "Welsh",
                    "Japanese": "Japanese",
                    "iw": "Hebrew",
                    "es": "Spanish",
                    "Deutsch": "German",
                    "English": "English",
                    "cy": "Welsh",
                    "ja": "Japanese",
                    "Chinese": "Chinese",
                    "Danish": "Danish",
                    "Francais": "French",
                    "da": "Danish",
                    "Dutch": "Dutch",
                    "nl": "Dutch"
                  }
                },
                {
                  "propertyName": [
                    "Publisher Country"
                  ],
                  "normalizationMap": {
                    "NO": " Norway",
                    "Singapore": "Singapore",
                    "BE": " Belgium",
                    "RU": " Russian Federation",
                    "United States": "United States",
                    "jp": "Japan",
                    "FR": "France",
                    "fr": "France",
                    "Russia": " Russian Federation",
                    " Belgium": " Belgium",
                    "SE": " Sweden",
                    "UK": "United Kingdom",
                    "uk": "United Kingdom",
                    "gb": "United Kingdom",
                    "France": "France",
                    "Kuwait": "Kuwait",
                    "ca": "Canada",
                    "CA": "Canada",
                    "us": "United States",
                    "US": "United States",
                    "SWE": " Sweden",
                    "USA": "United States",
                    "Japan": "Japan",
                    "BEL": " Belgium",
                    "United Kingdom": "United Kingdom",
                    " Norway": " Norway",
                    "Spain": "Spain",
                    " Sweden": " Sweden",
                    "NOR": " Norway",
                    "Canada": "Canada",
                    "RUS": " Russian Federation",
                    "AU": "Australia",
                    "au": "Australia",
                    "Italy": "Italy",
                    "Australia": "Australia",
                    " Russian Federation": " Russian Federation"
                  }
                },
                {
                  "propertyName": [
                    "Type"
                  ],
                  "normalizationMap": {
                    "cartoon": "Cartoon",
                    "Illustration": "Illustration",
                    "character profile": "Character profile",
                    "Cartoon": "Cartoon",
                    "Character profile": "Character profile",
                    "cover": "Cover",
                    "Cover": "Cover",
                    "photo story": "Photo Story",
                    "filler": "Filler",
                    "illustration": "Illustration",
                    "Filler": "Filler",
                    "Story": "Story",
                    "Photo Story": "Photo Story",
                    "story": "Story"
                  }
                }
              ]
            },
            "@class": "com.ebay.sdo.integ.etl.exporter.webcontracts.productprocessingjob.enrichers.settings.generic.normalization.ValueNormalizationEnricherSettingsWeb"
          },
          {
            "elementName": "SimplePatternEnricher",
            "elementSettings": {
              "patterns": [
                {
                  "conditionPropertiesValue": {},
                  "pattern": "%s %s (%s, %s)",
                  "propertySettings": [
                    {
                      "propertyName": "Series Name",
                      "useMultiValue": false,
                      "delimiter": null
                    },
                    {
                      "propertyName": "Issue Number",
                      "useMultiValue": false,
                      "delimiter": null
                    },
                    {
                      "propertyName": "Publication Date",
                      "useMultiValue": false,
                      "delimiter": null
                    },
                    {
                      "propertyName": "Comics Publihser",
                      "useMultiValue": false,
                      "delimiter": null
                    }
                  ]
                },
                {
                  "conditionPropertiesValue": {},
                  "pattern": "%s %s (%s)",
                  "propertySettings": [
                    {
                      "propertyName": "Series Name",
                      "useMultiValue": false,
                      "delimiter": null
                    },
                    {
                      "propertyName": "Issue Number",
                      "useMultiValue": false,
                      "delimiter": null
                    },
                    {
                      "propertyName": "Publication Date",
                      "useMultiValue": false,
                      "delimiter": null
                    }
                  ]
                },
                {
                  "conditionPropertiesValue": {},
                  "pattern": "%s %s (%s)",
                  "propertySettings": [
                    {
                      "propertyName": "Series Name",
                      "useMultiValue": false,
                      "delimiter": null
                    },
                    {
                      "propertyName": "Issue Number",
                      "useMultiValue": false,
                      "delimiter": null
                    },
                    {
                      "propertyName": "Publisher",
                      "useMultiValue": false,
                      "delimiter": null
                    }
                  ]
                },
                {
                  "conditionPropertiesValue": {},
                  "pattern": "%s %s",
                  "propertySettings": [
                    {
                      "propertyName": "Series Name",
                      "useMultiValue": false,
                      "delimiter": null
                    },
                    {
                      "propertyName": "Issue Number",
                      "useMultiValue": false,
                      "delimiter": null
                    }
                  ]
                }
              ],
              "changedPropertyName": "Title"
            },
            "@class": "com.ebay.sdo.integ.etl.exporter.webcontracts.productprocessingjob.enrichers.settings.generic.pattern.PatternEnricherSettingsWeb"
          },
          {
            "elementName": "NameNormalizationEnricher",
            "elementSettings": {
              "normalizationMap": {
                "Scripts": "Scripts",
                "Comics Publihser": "Publisher",
                "Characters": "Characters",
                "Indicia Publisher": "Indicia Publisher",
                "Cover Brand Name": "Cover Brand Name",
                "Pencils": "Pencils",
                "Inks": "Inks",
                "Publication Year": "Publication Year",
                "Type": "Type",
                "Cover Price": "Cover Price",
                "Story Titles": "Story Titles",
                "[various]": "Title",
                "Issue Number": "Issue Number",
                "Publication Date": "Publication Date",
                "Language": "Language",
                "Volume": "Volume",
                "Publisher Country": "Publisher Country",
                "Series Name": "Series Name",
                "Genre": "Genre",
                "Series Publication Country": "Series Publication Country",
                "Number of Pages": "Number of Pages"
              }
            },
            "@class": "com.ebay.sdo.integ.etl.exporter.webcontracts.productprocessingjob.enrichers.settings.generic.normalization.NameNormalizationEnricherSettingsWeb"
          },
          {
            "elementName": "VendorNormalizationEnricher",
            "elementSettings": {
              "normalizedVendor": "GCD"
            },
            "@class": "com.ebay.sdo.integ.etl.exporter.webcontracts.productprocessingjob.enrichers.settings.generic.VendorNormalizationEnricherSettingsWeb"
          },
          {
            "elementName": "FilterEnricher",
            "elementSettings": {
              "filterMode": "INCLUDE",
              "properties": [
                "Characters",
                "UPC",
                "Indicia Publisher",
                "Cover Brand Name",
                "Inks",
                "Format",
                "Publication Date",
                "Language",
                "Publisher Country",
                "Main Character",
                "Product Description",
                "Scripts",
                "Title",
                "Grade",
                "Publisher",
                "Pencils",
                "Publication Year",
                "Type",
                "Cover Price",
                "Story Titles",
                "Issue Number",
                "Volume",
                "Series Name",
                "Genre",
                "Series Publication Country",
                "Number of Pages"
              ]
            },
            "@class": "com.ebay.sdo.integ.etl.exporter.webcontracts.productprocessingjob.enrichers.settings.filter.FilterEnricherSettingsWeb"
          },
          {
            "elementName": "AggregationKeyProductEnricher",
            "elementSettings": {
              "aggKeyPropertyName": "VENDOR_REFERENCE_ID"
            },
            "@class": "com.ebay.sdo.integ.etl.exporter.webcontracts.productprocessingjob.enrichers.settings.aggregationkey.AggregationKeyEnricherSettingsWeb"
          },
          {
            "elementName": "RemoveSpecialCharactersEnricher",
            "elementSettings": {
              "specialCharacters": [
                "\n",
                "\t"
              ]
            },
            "@class": "com.ebay.sdo.integ.etl.exporter.webcontracts.productprocessingjob.enrichers.settings.generic.RemoveSpecialCharactersEnricherSettingsWeb"
          },
          {
            "elementName": "SimplePatternEnricher",
            "elementSettings": {
              "patterns": [
                {
                  "conditionPropertiesValue": {},
                  "pattern": "TRUE",
                  "propertySettings": []
                }
              ],
              "changedPropertyName": "curated_product"
            },
            "@class": "com.ebay.sdo.integ.etl.exporter.webcontracts.productprocessingjob.enrichers.settings.generic.pattern.PatternEnricherSettingsWeb"
          },
          {
            "elementName": "RemoveLongValuesEnricher",
            "elementSettings": {
              "whitelistProperties": [],
              "maxValueLength": 4000
            },
            "@class": "com.ebay.sdo.integ.etl.exporter.webcontracts.productprocessingjob.enrichers.settings.generic.RemoveLongValuesEnricherSettingsWeb"
          }
        ],
        "validatorConfigurations": [
          {
            "elementName": "EmptyProductValidator",
            "elementSettings": {}
          },
          {
            "elementName": "RequireProductFieldsProductValidatorImpl",
            "elementSettings": {}
          },
          {
            "elementName": "ProductReaderStatusValidator",
            "elementSettings": {}
          },
          {
            "elementName": "MandatoryPropertiesValidator",
            "elementSettings": {
              "propertyNames": [
                "VENDOR_REFERENCE_ID",
                "Title"
              ]
            }
          }
        ]
      },
      "errors": []
    }
  }
  return json;
}

