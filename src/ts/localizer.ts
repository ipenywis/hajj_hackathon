//Localize and fine the json files for Different Languages
import * as path from "path";
export const LANGUAGE_PATH = path.resolve("../locale/");

import en from "../locale/en";
import ar from "../locale/ar";

export const SUPPOTED = ["en", "ar"];

//Lodash
import * as _ from "lodash";

export default class Localizer {
  private path : string;
  private current : string;
  //Locale JSON File
  private obj : any;

  static isLangValid(lang : string) : boolean {
    //Is language Supported!
    return _.includes(SUPPOTED, lang);
  }

  constructor(path : string = LANGUAGE_PATH, default_lang : string = "ar") {
    this.path = path;
    this.current = default_lang;
    //Open file Instance
    /*fs.readFile(this.path + "/" + this.current, "utf8", (err, data) => {
      if (err)
        throw err.message;
      this.obj = JSON.parse(data);
    });*/
    this.updateLanguage();
  }

  updateLanguage() {
    switch (this.current) {
      case "ar":
        this.obj = ar;
        break;
      case "en":
        this.obj = en;
        break;
      default:
        this.obj = "ar";
        console.log(`No Language Found With code: ${this.current}`);
        break;
    }
  }

  //Set Current Language
  setCurrentLanguage(lang : string = "ar") {
    this.current = lang;
    //Update
    this.updateLanguage();
  }

  //Localize Current Language (Give JSON key returns Value)
  locale(key : string) : string {
    //Open and read JSON file
    console.log("Locale OBJ: ", this.obj);
    let val = null;
    //Find and Return Value of specified Key
    return this.obj[key];
  }

}