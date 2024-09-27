


class PolyNoteClass {
  constructor(myAudioContext,freq,volume,tempo){
    var PN = this;
    this.noteLevel = volume / 50;

    this.tempo = tempo;
    //Constructor
     //freq = noteToFrequency(midinote);
    let freq2 = freq * 2;
    if (!myAudioContext){
      console.log('no audio context')
      return
    }
    this.gainNode = myAudioContext.createGain();
    this.gainNode.gain.value = 0;

    this.osc1 = myAudioContext.createOscillator();
    this.osc1.type = 'sine';
    this.osc1.frequency.value = freq;
    this.osc2 = myAudioContext.createOscillator();
    this.osc2.type = 'square';
    this.osc2.frequency.value = freq2;
    this.gainNode.connect(myAudioContext.destination);
    this.osc1.connect(this.gainNode);
    this.osc2.connect(this.gainNode);
    this.attackEnvelope();
    this.osc1.start(0);
    this.osc2.start(0);
    setTimeout(
      ()=>{
        this.decayEnvelope()
      },2000 / tempo);
  }

  attackEnvelope(){
    this.currentLevel = 0;
    this.attackStep = 0;
    this.attackRate = 1;
    this.noteLevel = .02;
    this.attackID = setInterval( this.attackInterval.bind(this),10);
    //  self.attackID = attackID;
  }

  attackInterval(){
      this.currentLevel = Math.sin(this.attackStep) * this.noteLevel

      if(this.attackStep < 1.5){
        this.gainNode.gain.value = this.currentLevel;
        this.attackStep = this.attackStep + this.attackRate;
      }
      else{
        this.gainNode.gain.value = this.noteLevel;
        clearInterval(this.attackID);
      }
  }

 decayEnvelope(){
    this.currentLevel = 0;
    this.decayStep = 0;
    this.decayRate = this.tempo / 3000;
    this.decayID = setInterval(this.decayInterval.bind(this),10);

  }

  decayInterval(){

      this.currentLevel = this.noteLevel - Math.sin(this.decayStep) * this.noteLevel;
      if(this.decayStep < 1.5){
        this.gainNode.gain.value = this.currentLevel;
        this.decayStep = this.decayStep + this.decayRate;
      }
      else{
        this.gainNode.gain.value = 0;
        this.osc1.stop();
        this.osc2.stop();
        clearInterval(this.decayID);
      }
  }

  stopNow(){
    this.osc1.stop();
    this.osc2.stop();
    clearInterval(this.decayID);
  }


}

class WebAudioSynth {
  constructor(noteScale,noteKey,window){
    this.window = window;
    this._keys = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
    this._Scales = {'Chromatic':[0,1,2,3,4,5,6,7,8,9,10,11], 'Original':[0,3,5,7,10] };
    this.key = this._keys.indexOf(noteKey);
    this.scale = this._Scales[noteScale];
    this.window.addEventListener('touchend',this.registerAudio.bind(this));
    this.window.addEventListener('mouseup',this.registerAudio.bind(this));
    this.window.addEventListener('load',this.registerAudio.bind(this));
    document.addEventListener('visibilitychange', () => {
      if(this.audioCtx && this.audioCtx.state !== 'closed') {
        this.pause(); // change tab text for demo
      }
    });
  }

  registerAudio() {
    if(!this.AudioCtx){
      let AudioContext = this.window.AudioContext;
      if(!AudioContext ){
        AudioContext = this.window.webkitAudioContext;
      }


      var audioCtx = new AudioContext();

      this.AudioCtx = audioCtx;

      var buffer = this.AudioCtx.createBuffer(1, 1, 96000,22050);
      var source = this.AudioCtx.createBufferSource();
      source.buffer = buffer;

      // connect to output (your speakers)
      source.connect(this.AudioCtx.destination);

      // play the file
      source.start(0);
    }
  }

  playNote(note){
    let scaledNote = this.noteToScale(note);
    let freq = this.noteToFrequency(scaledNote)
    new PolyNoteClass(this.AudioCtx,freq,10,120);
  }

  stopAudio(){
    this.AudioCtx.close();
  }

  pause(){
    this.playState = false;
    this.pauseButton("play");
    this.closeAudioContext();
    clearInterval(this.playID);
  }

  closeAudioContext(){
    this.AudioCtx.close();
  };

  noteToFrequency(note){
    note = note - 36; // zero semitone difference at A;
    return Math.pow(2,note/12) * 440;
  }

  noteToScale(note, scale = this.scale, key = this.key){ //note as original note, scale as an array of intervals, and key as int a = 0

    var octave = (12 * Math.floor(note / scale.length)) % 60;
    var offset = note % scale.length;
    return octave + scale[offset] + key;
  }

}

//const instance = new WebAudioSynth('Original','C');
//Object.freeze(instance);

//export default instance;
export default WebAudioSynth;
