import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { BrowserModule, DomSanitizer } from "@angular/platform-browser";
import Quill from 'quill/core';
//let Quill = require('quill');
import Snow from 'quill/themes/snow';
import Toolbar from 'quill/modules/toolbar';
import Bold from 'quill/formats/bold';
import Italic from 'quill/formats/italic';
import Header from 'quill/formats/header';
import "quill/dist/quill.core.css"
import "quill/dist/quill.snow.css"


Quill.register({
  'themes/snow': Snow,
  'modules/toolbar': Toolbar,
  'formats/bold': Bold,
  'formats/italic': Italic,
  'formats/header': Header
});

@Component({
  selector: "app-dynamic-form",
  templateUrl: "./dynamic-form.component.html",
  styleUrls: ["./dynamic-form.component.css"]
})
export class DynamicFormComponent {
  imageList: any;

  @Input() dataObject;
  form: FormGroup;
  editorElem;

  @Output() handleForm = new EventEmitter();

  @Output() cancel = new EventEmitter();

  constructor(private elementRef: ElementRef) {

  }

  ngAfterViewInit()  {

    this.editorElem = this.elementRef.nativeElement.querySelector(
      '[editor]'
);
    var quill = new Quill(this.editorElem, {
      //theme: 'themes/snow',
      
    });

    quill.on('text-change', function(delta, oldDelta, source) {
      console.log('change', delta)
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const formGroup = {};

    for (let prop of this.dataObject) {
      if (prop.type == "checklist") {
        let controls = this.createOptionControls(prop);
        formGroup[prop.name] = new FormArray(controls);
      } else {
        formGroup[prop.name] = new FormControl(
          prop.value || "",
          this.mapValidators(prop.validation)
        );
      }
    }

    this.form = new FormGroup(formGroup);
    console.log("form", this.form);
  }

  createOptionControls(prop) {
    let options = prop.options || [];
    let controls = [];
    for (let option of options) {
      let value = prop.value && prop.value.indexOf(option.value) !== -1;
      controls.push(new FormControl(value));
    }
    return controls;
  }

  private mapValidators(validators) {
    const formValidators = [];

    if (validators) {
      for (const validation of Object.keys(validators)) {
        if (validation === "required") {
          formValidators.push(Validators.required);
        } else if (validation === "min") {
          formValidators.push(Validators.min(validators[validation]));
        }
      }
    }

    return formValidators;
  }

  onSubmit(values) {
    for (let key in values) {
      // upravit
      if (
        values[key] instanceof Array &&
        values[key].every(v => typeof v === "boolean")
      ) {
        values[key] = this.getOptionValues(key, values);
      }
    }
    this.handleForm.emit(values);
  }

  cancelSubmit() {
    this.cancel.emit();
  }

  getOptionValues(key, values) {
    let obj = this.dataObject.find(obj => obj.name == key);
    let options = [];
    values[key].forEach(function(value, i) {
      value ? options.push(obj.options[i].value) : null;
    });
    return options;
  }
}
