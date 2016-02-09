class Magic8Ball {
  constructor() {
    this.phrases = [
      'Try again',
      'No',
      'Yes',
      'Maybe',
      'Undecided',
      'It is certain',
      'It is decidedly so',
      'Without a doubt',
      'Yes, definitely',
      'You may rely on it',
      'All signs point to yes',
      'Outlook good',
      'Reply hazy try again',
      'Ask Again later',
      'Cannot predict now',
      'My sources say no',
      'Very doubtful',
      'Hmm... no'
    ];
  }

  pickPhrase() {
    return this.phrases[ Math.floor( Math.random() * this.phrases.length ) ];
  }

  shake() {
    Session.set('phrase', this.pickPhrase());
  }
}

if (Meteor.isClient) {
  let magic8Ball = new Magic8Ball();
  let shake = new Shake();

  shake.start();

  Session.setDefault('phrase', '');

  Template.eightBall.onCreated(() => {
    window.addEventListener( 'shake', magic8Ball.shake.bind( magic8Ball ), false );
  });

  Template.eightBall.onDestroyed(() => {
    window.removeEventListener( 'shake', magic8Ball.shake.bind( magic8Ball ), false );
  });

  Template.eightBall.helpers({
    phrase() {
      return Session.get('phrase');
    }
  });

  Template.eightBall.events({
    'click button'() {
      magic8Ball.shake();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
