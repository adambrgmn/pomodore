export default class Alert {
  constructor(soundName) {
    // Create necessary objects
    this.audioPlayer = document.createElement('audio');
    this.mp3Source = document.createElement('source');
    this.oggSource = document.createElement('source');
    this.mp3Location = `sound/mp3/${soundName}.mp3`;
    this.oggLocation = `sound/ogg/${soundName}.ogg`;
    this.supported = true;
    this.eventsSet = false;

    // Check if everything is supported
    if (!document.createElement('audio').canPlayType) {
      console.error('Oh man😩! \nYour browser doesn\'t support audio awesomeness.');
      this.supported = false;
    }

    // Load and attatch to body
    this.audioPlayer.setAttribute('preload', true);
    this.mp3Source.setAttribute('type', 'audio/mpeg');
    this.oggSource.setAttribute('type', 'audio/ogg');
    this.audioPlayer.appendChild(this.mp3Source);
    this.audioPlayer.appendChild(this.oggSource);
    this.mp3Source.setAttribute('src', this.mp3Location);
    this.oggSource.setAttribute('src', this.oggLocation);
    this.audioPlayer.load();

    document.body.appendChild(this.audioPlayer);
  }

  play(num) {
    let repeats = 0;
    this.audioPlayer.addEventListener('ended', () => {
      repeats++;
      if (repeats < num) {
        this.audioPlayer.currentTime = 0;
        this.audioPlayer.play();
      }
    });

    this.audioPlayer.play();
  }
}
