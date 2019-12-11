


class EventLooper {
  //Sync Interval in milliseconds, suggested be greater than 4;
  constructor(syncInterval = 10,stepCount = 1000){
      this.syncInterval = syncInterval;
      this.currentStep = 0;
      this.curentObj = {currentStep:0};
      this.stepCount = stepCount;
      this.loopArray = Array.apply(null, Array(stepCount)).map(function () { return []});
  }

  start(){
    this.intervalID = setInterval(this.step.bind(this),this.syncInterval)
  }


  step(){
    let events = this.loopArray[this.currentStep];
    if(events.length > 0){
      let clone = [... events]
      while(clone && clone.length > 0){
        let func = clone.pop();
        func();
        /*
        var elems = document.querySelectorAll(".letra");

        [].forEach.call(elems, function(el) {
            el.classList.remove("activeLetter");
        });
        */
        var spans = document.querySelectorAll('.' + 'active' + this.currentStep);
        setTimeout(()=>{
          for (var i = 0; i < spans.length; i++){
            spans[i].classList.remove('activeLetter');
          }
        },1000);

        for (var i = 0; i < spans.length; i++){
          spans[i].classList.add('activeLetter');
        }
        //this.currentStep.addClass()
      }

    }

    this.currentStep++;

    if(this.currentStep == this.stepCount){
      this.currentStep = 0;
    }
  }

  insertEvent(event){
    let newLen = this.loopArray[this.currentStep].push(event);
    //Simple Hash for event position
    return {stepNumber:this.currentStep, functionNumber:newLen - 1}
  }

  deleteSpans(deletedSpans){
    console.log(deletedSpans);
    let len = deletedSpans.length;
    for(let i = 0; i < len; i++){
      let attributes = deletedSpans[i];
      if(attributes.localName == 'span')
        this.deleteEvent(Number(attributes.dataset['stepnumber']),Number(attributes.dataset['functionnumber']) );
    }
  }

  deleteEvent(stepNumber,functionNumber){
     this.loopArray[stepNumber].splice(functionNumber,1);
  }

  stop(){
    clearInterval(this.intervalID);
  }




}

const instance = new EventLooper();
//Object.freeze(instance);

export default instance;
