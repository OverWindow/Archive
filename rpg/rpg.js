const $startScreen = document.querySelector('#start-screen');
const $gameMenu = document.querySelector('#game-menu');
const $battleMenu = document.querySelector('#battle-menu');
const $shopMenu = document.querySelector('#shop-menu');

const $startMessage = document.querySelector('#start-message');
const $battleMessage = document.querySelector('#battle-message');
const $gameMessage = document.querySelector('#game-message');

const $heroName = document.querySelectorAll('.hero-name');
const $heroLevel = document.querySelectorAll('.hero-level');
const $heroHp = document.querySelectorAll('.hero-hp');
const $heroXp = document.querySelectorAll('.hero-xp');
const $heroAtt = document.querySelectorAll('.hero-att');
const $heroMoney = document.querySelectorAll('.hero-money');

const $monsterName = document.querySelector('.monster-name');
const $monsterHp = document.querySelector('.monster-hp');
const $monsterAtt = document.querySelector('.monster-att');

const $battleHero = document.querySelector('#battle-hero');
const $imageCrop = document.querySelector('#battle-monster');
const $monsterImg = document.querySelector('#img-monster');

const $menuAdventure = document.querySelector('.menu-1');
const $menuRest = document.querySelector('.menu-2');
const $menuShop = document.querySelector('.menu-3');
const $menuExit = document.querySelector('.menu-4');

const $battleAttack = document.querySelector('.battle-1');
const $battleHeal = document.querySelector('.battle-2');
const $battlePotion = document.querySelector('.battle-3');
const $battleRun = document.querySelector('.battle-4');

class Game {
	constructor(name) {
		this.monster = null;
		this.hero = null;
		this.monsterList = [
			{ name: '스켈레톤', hp: 25, att: 10, xp: 10, money: 10, x:4200, y:-95, scene:600 },
			{ name: '구석 고블린', hp: 50, att: 15, xp: 20, money: 15, x:2400, y:-90,scene: 600 },
			{ name: '코로나', hp: 75, att: 20, xp: 30, money: 30, x:4250, y: -150, scene:600},
			{ name: '눈이 충혈된 버섯', hp: 150, att: 35, xp: 50, money: 50, x:5000, y:-155, scene:700 },
		];
		this.start(name);
	}

	changeScreen(target) {
		if (target === 'start') { //시작 화면
			$startScreen.style.display = 'block';
			$gameMenu.style.display = 'none';
			$battleMenu.style.display = 'none';
			$shopMenu.style.display = 'none';
		} else if (target === 'game') { //게임 화면
			$startScreen.style.display = 'none';
			$gameMenu.style.display = 'flex';
			$battleMenu.style.display = 'none';
			$shopMenu.style.display = 'none';
		} else if (target === 'battle') { //전투 화면
			$startScreen.style.display = 'none';
			$gameMenu.style.display = 'none';
			$battleMenu.style.display = 'block';
			$shopMenu.style.display = 'none';
		} else if (target === 'shop') { //상점 화면
			$startScreen.style.display = 'none';
			$gameMenu.style.display = 'none';
			$battleMenu.style.display = 'none';
			$shopMenu.style.display = 'block';
		}
	}

	start(name) {
		this.changeScreen('game');
		this.hero = new Hero(this, name);
		this.updateHeroStat();
		menuClickAble = true;
		$menuAdventure.addEventListener('click', this.onAdventure);
		$menuRest.addEventListener('click', this.onRest);
    //$menuShop.addEventListener('click',this.onShop);
		$menuExit.addEventListener('click', this.onExit);
	}

	onAdventure = () => {
		if (!menuClickAble) {
			return;
		}
		menuClickAble = false;
		this.changeScreen('battle');
		const randomIndex = Math.floor(Math.random() * this.monsterList.length);
		const randomMonster = this.monsterList[randomIndex];
		this.monster = new Monster(
			this,
			randomMonster.name,
			randomMonster.hp,
			randomMonster.att,
			randomMonster.xp,
			randomMonster.money,
			randomMonster.x,
			randomMonster.y,
			randomMonster.scene,
		);
		this.updateHeroStat();
		this.updateMonsterStat();
		this.showMessage('battle', `몬스터를 마주쳤다 "${this.monster.name}"인 것 같다`);
		this.monster.imgChange(this.monster.name); //
		$battleAttack.addEventListener('click',this.battleAttack);
		$battleHeal.addEventListener('click',this.battleHeal);
		//$battlePotion.addEventListener('click',this.battlePotion);
		$battleRun.addEventListener('click',this.battleRun);
	}

	battleAttack = () => {
		if(!battleButton) {
			return;
		}
		const {hero,monster} = this;
		battleButton = false;
		if(hero.hp - monster.att <= 0) { //hero die
			hero.hp = 0;
			this.updateHeroStat();
			this.showMessage('battle','으악 죽음');
			$battleHero.src = '';
			setTimeout(()=>{
				this.quit();
				battleButton = true;
			},2000);
		} else if (monster.hp - hero.att <= 0) { //monster die
			monster.hp = 0;
			this.updateMonsterStat();
			this.showMessage('battle',`${monster.name}를 처치하였습니다. ${monster.xp}XP를 획득하셨습니다.`);
			hero.attack(monster);
			$monsterImg.src = '';
			this.monster = null;
			hero.getXpAndMoney(monster.xp,monster.money);
			setTimeout(() => {
				this.showMessage('battle',`레벨업! ${hero.level} LEV`);
			},2000);
			setTimeout(()=>{
				this.changeScreen('game');
				this.showMessage('game','');
				menuClickAble = true;
				battleButton = true;
			},4000);
		} else { //attack trade
			hero.attack(monster);
			monster.attack(hero);
			this.showMessage('battle',`${hero.att}의 데미지를 가하고 ${monster.att}의 데미지를 입었습니다. `);
		}
		this.updateHeroStat();
		this.updateMonsterStat();
	}
	
	battleHeal = () => {
		if(!battleButton) {
			return;
		}
		battleButton = false;
		const { hero, monster} = this;
		hero.heroHeal(monster);
		monster.attack(hero);
		this.showMessage('battle',`${hero.heal}만큼 체력을 회복하고, ${monster.att}의 데미지를 입었습니다.`);
		this.updateHeroStat();
		battleButton = true;
	}

	battleRun = () => {
		if(!battleButton) {
			return;
		}
		battleButton = false;
		this.monster = null;
		this.showMessage('battle','전투에서 도망칩니다');
		setTimeout(()=>{
			this.changeScreen('game');
			this.showMessage('game','');
			menuClickAble = true;
		},1000);
		battleButton = true;
	}

	onRest = () => {
		if (!menuClickAble) {
			return;
		}
		this.hero.hp = this.hero.maxHp;
		this.updateHeroStat();
		this.showMessage('game', '휴식을 취해 체력을 회복했다');
	}

	onExit = () => {
		if (!menuClickAble) {
			return;
		}
		menuClickAble = false;
		this.quit();
	}
	
	updateHeroStat() {
		if (this.hero === null) {
			console.log('NoHeroStat');
			for (let i = 0; i < 2; i++) {
				$heroName[i].textContent = '';
				$heroAtt[i].textContent = '';
				$heroHp[i].textContent = '';
				$heroLevel[i].textContent = '';
				$heroXp[i].textContent = '';
				$heroMoney[i].textContent = '';
			}
			return;
		}
		console.log('YesHeroStat');
		for (let i = 0; i < 2; i++) {
			$heroName[i].textContent = this.hero.name;
			$heroAtt[i].textContent = `ATT: ${this.hero.att}`;
			$heroHp[i].textContent = `HP: ${this.hero.hp}/${this.hero.maxHp}`;
			$heroXp[i].textContent = `XP: ${this.hero.xp}/${10 * this.hero.level}`;
			$heroLevel[i].textContent = `LEV: ${this.hero.level}`;
			$heroMoney[i].textContent = `MONEY: ${this.hero.money}`;
		}
	}

	updateMonsterStat() {
		if (this.monster === null) {
			console.log('NoMonsterStat');
			$monsterName.textContent = '';
			$monsterAtt.textContent = '';
			$monsterHp.textContent = '';
			return;
		}
		console.log('YesMonsterStat');
		$monsterName.textContent = this.monster.name;
		$monsterAtt.textContent = `ATT:${this.monster.att}`;
		$monsterHp.textContent = `HP:${this.monster.hp}/${this.monster.maxHp}`;
	}
	
	showMessage(target, text) {
		if (target === 'start') {
			$startMessage.textContent = text;
		} else if (target === 'game') {
			$gameMessage.textContent = text;
		} else if (target === 'battle') {
			$battleMessage.textContent = text;
		}
	}
	
	quit() {
		this.hero = null;
		this.monster = null;
		this.updateHeroStat();
		this.updateMonsterStat();
		menuClickAble = true;
		this.changeScreen('start');
		console.log('Hello');
		this.showMessage('start', '게임을 종료합니다');
		$menuAdventure.removeEventListener('click', this.onAdventure);
		$menuRest.removeEventListener('click', this.onRest);
    	//$menuShop.removeEventListener('click',this.onShop);
		$menuExit.removeEventListener('click', this.onExit);

		$battleAttack.removeEventListener('click',this.battleAttack);
		$battleHeal.removeEventListener('click',this.battleHeal);
		//$battlePotion.removeEventListener('click',this.battlePotion);
		$battleRun.removeEventListener('click',this.battleRun);
		game = null;
	}
}

class Unit {
	constructor(game, name, hp, att, xp) {
		this.game = game;
		this.name = name;
		this.hp = hp;
		this.maxHp = hp;
		this.xp = xp;
		this.att = att;
	}
	
	attack(target) {
		target.hp -= this.att;
	}
}

class Hero extends Unit {
	constructor(game, name) {
		super(game, name, 100, 10, 0);
		this.money = 0;
		this.level = 1;
		this.heal = 15;
	}

	attack(target) {
		super.attack(target);
		$battleHero.src = './assets/GIFs/Knight-Attack.gif';
		$battleHero.style.height = '410px';
		$battleHero.style.objectPosition = "-20px -80px";
		setTimeout(() => {
			console.log('hero attacking');
			$battleHero.src = './assets/GIFs/Knight-Walk.gif';
			$battleHero.style.height = '320px';
			$battleHero.style.objectPosition = "0 0";
			battleButton = true;
		},800);
	}

	heroHeal(monster) {
		this.hp = Math.min(this.maxHp, this.hp + this.heal);
	}

	getXpAndMoney(xp,money) {
		this.xp += xp;
		this.money += money;
		if (this.xp >= this.level * 10) {
			this.xp -= this.level * 10;
			this.level += 1;
			this.maxHp += 10;
			this.att += 5;
			this.heal += 5;
			this.hp = this.maxHp;
		}
	}
}

class Monster extends Unit {
	constructor(game, name, hp, att, xp, money,x,y,scene) {
		super(game, name, hp, att, xp);
		this.money = money;
		this.posX = x;
		this.posY = y;
		this.scene = scene;
	}

	attack(target) {
		super.attack(target);
		this.attackAnimation();
	}

	attackAnimation() {
		let scenePixel = this.scene;
		let i = 0;
		battleButton = false;
		let attackAni = setInterval(()=>{
			if( i >= 8) { 
				$monsterImg.style.objectPosition = `${this.posX}px ${this.posY}px`;
				battleButton = true;
				clearInterval(attackAni);
				return; 
			}
			$monsterImg.style.objectPosition = `${this.posX-scenePixel}px ${this.posY}px`;
			scenePixel += this.scene;
			i += 1;
		},100);
	}

	imgChange(monsterName) {
		if (monsterName === '스켈레톤') {
			$monsterImg.src = './assets/Skeleton/Attack2.png';
			$monsterImg.style.objectPosition = `${this.posX}px ${this.posY}px`;
			$monsterImg.style.height = `${this.scene}px`;
		} else if (monsterName === '구석 고블린') {
			$monsterImg.src = './assets/Goblin/Attack2.png';
			$monsterImg.style.height = `${this.scene}px`;
			$monsterImg.style.objectPosition = `${this.posX}px ${this.posY}px`;
		} else if (monsterName === '코로나') {
			$monsterImg.src = './assets/FlyingEye/Attack2.png';
			$monsterImg.style.height = `${this.scene}px`;
			$monsterImg.style.objectPosition = `${this.posX}px ${this.posY}px`;
		} else if (monsterName === '눈이 충혈된 버섯') {
			$monsterImg.src = './assets/Mushroom/Attack2.png';
			$monsterImg.style.height = `${this.scene}px` ;
			$monsterImg.style.objectPosition = `${this.posX}px ${this.posY}px`;
		} 
	}
}

let battleButton = true;
let menuClickAble = false;
let game = null;
$startScreen.addEventListener('submit', (event) => {
	event.preventDefault();
	const name = event.target['name'].value;
	if (name === '') {
		game = new Game('이름 모를 용사');
	} else {
		game = new Game(name);
	}
});