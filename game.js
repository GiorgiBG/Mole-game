let score = 0;
function getSadInterval() {
  return Date.now() + 1000;
}

function getGoneInterval() {
  return Date.now() + Math.floor(Math.random() * 18000) + 2000;
}

function getHungryInterval() {
  return Date.now() + Math.floor(Math.random() * 3000) + 2000;
}

function getKingStatus() {
  return Math.random() > 0.6;
}
const moles = [
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-0'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-1'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-2'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-3'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-4'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-5'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-6'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-7'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-8'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-9'),
  },
];

function getNextStatus(mole) {
  switch (mole.status) {
    case 'fed':
    case 'sad':
      mole.next = getSadInterval();
      mole.status = 'leaving';
      if (mole.king) {
        mole.node.children[0].src = './static/king-mole-leaving.png';
      } else {
        mole.node.children[0].src = './static/mole-leaving.png';
      }
      break;
    case 'leaving':
      mole.next = getGoneInterval();
      mole.status = 'gone';
      mole.node.children[0].classList.add('gone');
      break;
    case 'gone':
      mole.status = 'hungry';
      mole.king = getKingStatus();
      mole.next = getHungryInterval();
      mole.node.children[0].classList.add('hungry');

      mole.node.children[0].classList.remove('gone');
      if (mole.king) {
        mole.node.children[0].src = './static/king-mole-hungry.png';
      } else {
        mole.node.children[0].src = './static/mole-hungry.png';
      }
      break;
    case 'hungry':
      mole.status = 'sad';
      mole.next = getSadInterval();
      if (mole.king) {
        mole.node.children[0].src = './static/king-mole-sad.png';
        mole.node.children[0].classList.remove('hungry');
      } else {
        mole.node.children[0].src = './static/mole-sad.png';
        mole.node.children[0].classList.remove('hungry');
      }

      break;
  }
}

function win() {
  document.querySelector('.bg').classList.add('gone');
  document.querySelector('.win').classList.remove('gone');
}

function feed(event) {
  if (
    event.target.tagName !== 'IMG' ||
    !event.target.classList.contains('hungry')
  ) {
    return;
  }
  const mole = moles[event.target.dataset.index];
  mole.status = 'fed';
  mole.next = getSadInterval();
  if (mole.king) {
    mole.node.children[0].src = './static/king-mole-fed.png';
    mole.node.children[0].classList.remove('hungry');
    score += 2;
  } else {
    mole.node.children[0].src = './static/mole-fed.png';
    mole.node.children[0].classList.remove('hungry');
    score++;
  }

  document.querySelector('.worm-container').style.width = `${10 * score}%`;
  if (score >= 10) {
    win();
  }
}

let runAgain = Date.now() + 1000;
function nextFrame() {
  const now = Date.now();
  if (runAgain <= now) {
    for (let i = 0; i < moles.length; i++) {
      if (moles[i].next <= now) {
        getNextStatus(moles[i]);
      }
    }
    runAgain = now + 1000;
  }
  requestAnimationFrame(nextFrame);
}

document.querySelector('.bg').addEventListener('click', feed);

nextFrame();
