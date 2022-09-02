//화면
const $startScreen = document.querySelector('#start-screen');
const $gameMenu = document.querySelector('#game-menu');
const $battleMenu = document.querySelector('#battle-menu');
const $shopMenu = document.querySelector('#shop-menu');

//메세지 관련
const $startMessage = document.querySelector('#start-message');
const $battleMessage = document.querySelector('#battle-message');
const $gameMessage = document.querySelector('#game-message');
const $shopMessage = document.querySelector('#shop-message');

//상점
const $shopPotions = document.getElementsByClassName('shop-potions');
const $potionName = document.querySelector('#potion-name');
const $potionMoney = document.querySelector('#potion-cost');
const $potionStat = document.querySelector('#potion-stat');
const $shopBuy = document.querySelector("#shop-buy");
const $shopSell = document.querySelector("#shop-sell");
const $shopExit = document.querySelector("#shop-exit");
const $shopInventory = document.getElementsByClassName('inventory');
const $shopMoney = document.querySelector('#shop-money');

//전투중 영웅 관련
const $heroName = document.querySelectorAll('.hero-name');
const $heroLevel = document.querySelectorAll('.hero-level');
const $heroHp = document.querySelectorAll('.hero-hp');
const $heroXp = document.querySelectorAll('.hero-xp');
const $heroAtt = document.querySelectorAll('.hero-att');
const $heroMoney = document.querySelectorAll('.hero-money');

//전투중 몬스터 관련
const $monsterName = document.querySelector('.monster-name');
const $monsterHp = document.querySelector('.monster-hp');
const $monsterAtt = document.querySelector('.monster-att');

//전투 모션 관련
const $battleHero = document.querySelector('#battle-hero');
const $imageCrop = document.querySelector('#battle-monster');
const $monsterImg = document.querySelector('#img-monster');

//메뉴
const $menuAdventure = document.querySelector('.menu-1');
const $menuRest = document.querySelector('.menu-2');
const $menuShop = document.querySelector('.menu-3');
const $menuExit = document.querySelector('.menu-4');

//전투 선택지
const $battleAttack = document.querySelector('.battle-1');
const $battleHeal = document.querySelector('.battle-2');
const $battlePotion = document.querySelector('.battle-3');
const $battleRun = document.querySelector('.battle-4');

//전투 중 포션에 관한
const $potionMenu = document.querySelector("#potion");
const $potionUse = document.querySelector("#potion-use");
const $potionExit = document.querySelector("#potion-exit");
const $potionPotions = document.getElementsByClassName('potion-inventory');

class Game {
	constructor(name) {
		this.monster = null;
		this.hero = null;
		this.inventory = new Array(3);
		this.inventory.fill(null);
		this.oneTurnSkill();
		this.monsterList = [
			{ name: '스켈레톤', hp: 25, att: 10, xp: 10, money: 10, x:4200, y:-95, scene:600 },
			{ name: '구석 고블린', hp: 50, att: 15, xp: 20, money: 15, x:2400, y:-90,scene: 600 },
			{ name: '코로나', hp: 75, att: 20, xp: 30, money: 30, x:4250, y: -150, scene:600},
			{ name: '눈이 충혈된 버섯', hp: 150, att: 35, xp: 50, money: 50, x:5000, y:-155, scene:700 },
		];
		this.potionList = [
			{ name: '누가봐도 체력 물약', money: 30, content: '체력을 50 회복합니다'},
			{ name: '칼이 날카로워졌어요', money: 40, content: '이번 전투에서 공격력 30 증가합니다'},
			{ name: '문도 궁', money: 100, content: '체력을 최대체력까지 회복합니다'},
			{ name: '몰래 한 대 때리기', money: 100, content: '몬스터에게 평타 한대를 몰래 때림니다'},
			{ name: '단검 던지기', money: 50, content: '단검을 던져 몬스터에게 30의 피해를 입힙니다'},
		]

		//상점 포션 진열창 정리 (한번만 호출해야하기에 여기다 적음)
		for( let i = 0; i < this.potionList.length; i++) {
			$shopPotions[i].textContent = this.potionList[i].name;
			$shopPotions[i].addEventListener('mouseover',() => {
				if(this.potionPicked === 1) {
					return;
				}
				$potionName.textContent = this.potionList[i].name;
				$potionMoney.textContent = `MONEY: ${this.potionList[i].money}`;
				$potionStat.textContent = this.potionList[i].content;
				$shopPotions[i].style.color = 'white';
				$shopPotions[i].style.backgroundColor ='black'; 
			});
			$shopPotions[i].addEventListener('mouseout',()=> {
				if(this.potionPicked === 1) {
					return;
				}
				$shopPotions[i].style.color = 'black';
				$shopPotions[i].style.backgroundColor ='white'
			});	
			$shopPotions[i].addEventListener('click',() => {
				if(this.potionPicked === 1 && this.secondClick[i] === 0) {
					return;
				} 
				if(this.secondClick[i] === 1) {
					this.potionPicked = 0;
					this.secondClick[i] = 0;
					this.potionPickName = null;
					$shopPotions[i].style.color = 'black';
					$shopPotions[i].style.backgroundColor ='white'
				} else if (this.secondClick[i] === 0) {	
					this.potionPicked = 1;
					this.secondClick[i] = 1;
					this.potionPickName = new Potion(
						this.potionList[i].name,
						this.potionList[i].money,
						this.potionList[i].content,
					);
					$shopPotions[i].style.color = 'white';
					$shopPotions[i].style.backgroundColor ='blue'
				}
				console.log(this.secondClick);
				console.log('function');
			});
		}

		//아이템 판매 선택지 (한번 호출 해야함)
		this.sellPotionIndex = null;
		let secondClickInventory = new Array(3);
		secondClickInventory.fill(0);
		let potionPickedInventory = 0
		for(let i = 0 ; i < 3; i++) {
			$shopInventory[i].addEventListener('click', () => {
				console.log('inventory clicked');
				if(this.inventory === null) {
					return;
				}
				if(secondClickInventory[i] === 0 && potionPickedInventory === 0) {
					$shopInventory[i].style.backgroundColor = 'green';
					$shopInventory[i].style.color = 'white';
					this.sellPotionIndex = i;
					secondClickInventory[i] = 1;
					potionPickedInventory = 1;
				} else if (secondClickInventory[i] === 1) {
					$shopInventory[i].style.backgroundColor = 'white';
					$shopInventory[i].style.color = 'black';
					this.sellPotionIndex = null;
					secondClickInventory[i] = 0;
					potionPickedInventory = 0;
				}
			});
		}

		//전투중 포션(한번만 호출 용)
		{
		let secondClickInventory = new Array(3);
		secondClickInventory.fill(0);
		let potionPickedInventory = 0;
		this.potionToUseIndex = null;
		for(let i = 0 ; i < 3; i++) {
			if(this.inventory[i]) {
				$potionPotions[i].textContent = this.inventory[i].name;
			}
			$potionPotions[i].addEventListener('click',() => {
				if(secondClickInventory[i] === 0 && potionPickedInventory === 0) {
					$potionPotions[i].style.backgroundColor = 'blue';
					$potionPotions[i].style.color = 'white';
					this.potionToUseIndex = i;
					potionPickedInventory = 1;
					secondClickInventory[i] = 1;
				} else if (secondClickInventory[i] === 1) {
					$potionPotions[i].style.backgroundColor = 'white';
					$potionPotions[i].style.color = 'black';
					this.potionToUseIndex = null;
					potionPickedInventory = 0;
					secondClickInventory[i] = 0;
				}
			});
		}
		}
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
			$potionMenu.style.display = 'none';
		} else if (target === 'shop') { //상점 화면
			$startScreen.style.display = 'none';
			$gameMenu.style.display = 'none';
			$battleMenu.style.display = 'none';
			$shopMenu.style.display = 'block';
		} else if (target === 'potion') {
			$startScreen.style.display = 'none';
			$gameMenu.style.display = 'none';
			$battleMenu.style.display = 'none';
			$shopMenu.style.display = 'none';
			$potionMenu.style.display = 'block';
		}
	}

	start(name) {
		this.changeScreen('game');
		this.hero = new Hero(this, name);
		this.updateHeroStat();
		menuClickAble = true;
		$menuAdventure.addEventListener('click', this.onAdventure);
		$menuRest.addEventListener('click', this.onRest);
     	$menuShop.addEventListener('click',this.onShop);
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
		this.monster.imgChange(this.monster.name); 

		$battleAttack.addEventListener('click',this.battleAttack);
		$battleHeal.addEventListener('click',this.battleHeal);
		$battlePotion.addEventListener('click',this.battlePotion);
		$battleRun.addEventListener('click',this.battleRun);
	}

	battleAttack = () => {
		if(!battleButton) {
			return;
		}
		battleButton = false;
		const {hero,monster} = this;
		hero.attack(monster);
		monster.attack(hero);
		if(hero.hp <= 0) { //hero die
			this.ifHeroDies();
		} else if (monster.hp <= 0) { //monster die
			this.ifMonsterDies();
		} else { //attack trade
			//hero.attack(monster);
			//monster.attack(hero);
			this.showMessage('battle',`${hero.att}의 데미지를 가하고 ${monster.att}의 데미지를 입었습니다. `);
		}
		this.updateHeroStat();
		this.updateMonsterStat();
	}
	
	ifHeroDies() {
		const{hero,monster} =this;
		hero.hp = 0;
		this.updateHeroStat();
		this.showMessage('battle','으악 죽음');
		//monster.attack(hero);
		$battleHero.src = '';
		setTimeout(()=>{
			this.quit();
			battleButton = true;
		},2000);
	}

	ifMonsterDies() {
		const{hero,monster} = this;
		monster.hp = 0;
		this.updateMonsterStat();
		//hero.attack(monster);
		$monsterImg.src = '';
		this.monster = null;
		hero.getXpAndMoney(monster.xp,monster.money);
		//포션 효과 제거
		this.oneTurnSkillEnd();
		setTimeout(() => {
			this.showMessage('battle',`${monster.name}를 처치하였습니다. ${monster.xp}XP를 획득하셨습니다.`);
		},2000);
		setTimeout(() => {
			this.showMessage('battle',`레벨업! ${hero.level} LEV`);
		},4000);
		setTimeout(()=>{
			this.changeScreen('game');
			this.showMessage('game','');
			menuClickAble = true;
			battleButton = true;
		},6000);
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

	battlePotion = () => {
		this.changeScreen('potion');

		$potionUse.addEventListener("click", this.potionActive);
		$potionExit.addEventListener('click',this.potionExit);
	}

	potionActive = () => {
		const { hero,monster } = this;
		$potionPotions[this.potionToUseIndex].style.backgroundColor = 'white';
		$potionPotions[this.potionToUseIndex].style.color = 'black';
		if(this.inventory[this.potionToUseIndex] === null) {
			return;
		}
		let potionUseName = this.inventory[this.potionToUseIndex].name;
		if(potionUseName === '누가봐도 체력 물약') {
			hero.hp = Math.min(hero.maxHp, hero.hp + 50);
		} else if (potionUseName === '칼이 날카로워졌어요') {
			hero.att += 30;
			this.skillKnifeSharpen = true;
		} else if (potionUseName === '문도 궁') {
			hero.hp = hero.maxHp;
		} else if (potionUseName === '몰래 한 대 때리기') {
			monster.hp -= hero.att;
			if(hero.hp <= 0) {
				this.ifHeroDies();
			} else if (monster.hp <= 0) {
				this.ifMonsterDies();
			}
		} else if (potionUseName === '단검 던지기') {
			monster.hp -= 30;
			if(hero.hp <= 0) {
				this.ifHeroDies();
			} else if (monster.hp <= 0) {
				this.ifMonsterDies();
			}
		}
		this.showMessage('battle',`"${potionUseName}"을 사용했다`)
		this.potionUsed();
	}

	oneTurnSkill() {
		this.skillKnifeSharpen = false;
	}

	oneTurnSkillEnd() {
		if(this.skillKnifeSharpen) {
			this.hero.att -= 30;
			this.skillKnifeSharpen = false;
		}
	}

	potionUsed() {
		$potionPotions[this.potionToUseIndex].style.backgroundColor= 'blue';
		this.inventory[this.potionToUseIndex] = null;
		this.potionToUseIndex = null;
		this.inventoryUpdate();
		this.updateHeroStat();
		this.updateMonsterStat();
	}

	potionExit = () => {
		/*for(let i = 0 ; i < 3; i++) {
			$potionPotions[i].style.backgroundColor = 'white';
			$potionPotions[i].style.color = 'black';
		}*/
		this.changeScreen('battle');
	}

	battleRun = () => {
		if(!battleButton) {
			return;
		}
		battleButton = false;
		this.monster = null;
		this.showMessage('battle','전투에서 도망칩니다');
		this.oneTurnSkillEnd();
		setTimeout(()=>{
			this.changeScreen('game');
			this.showMessage('game','');
			menuClickAble = true;
			battleButton = true;
		},1000);
	}

	onRest = () => {
		if (!menuClickAble) {
			return;
		}
		this.hero.hp = this.hero.maxHp;
		this.updateHeroStat();
		this.showMessage('game', '휴식을 취해 체력을 회복했다');
	}	
	
	onShop = () => {
		if (!menuClickAble) {
			return;
		}
		this.inventoryUpdate();
		this.changeScreen('shop');
		this.potionPickName = null;
		this.potionPicked = 0;
		this.secondClick = new Array(this.potionList.length); //포션 갯수
		this.secondClick.fill(0);	
		console.log(this.secondClick);

		//상점 메뉴
		$shopBuy.addEventListener('click',this.shopBuy);
		$shopSell.addEventListener('click',this.shopSell);
		$shopExit.addEventListener('click',this.shopExit);
	}



	onExit = () => {
		if (!menuClickAble) {
			return;
		}
		menuClickAble = false;
		this.quit();
	}
	
	shopBuy = () => {
		if(this.potionPickName === null) {
			this.showMessage('shop','포션을 먼저 선택하세요. 용사님 제발');
			return;
		}
		
		if(this.potionPickName.money > this.hero.money) {
			this.showMessage('shop','돈이 없잖아요. 용사님 제발');
			return;
		}
		
		if(this.inventory[0] != null && this.inventory[1] != null && this.inventory[2] != null) {
			this.showMessage('shop','인벤토리가 꽉 찼잖아요. 용사님 제발');
			return;
		}
		console.log('potion bought');
		this.hero.money -= this.potionPickName.money;
		//inventory에 포션 채워 넣기
		for(let i = 0; i < 3; i++) {
			if( this.inventory[i] === null) {
				this.inventory[i] = this.potionPickName;
				break;
			} 
		}
		console.log(this.inventory);
		this.inventoryUpdate();
	}

	inventoryUpdate() {
		if(this.hero) {
			$shopMoney.textContent = `MONEY: ${this.hero.money}`;
		}
		for(let i = 0 ; i < 3; i++) {
			if(this.inventory[i]) {
				$shopInventory[i].textContent = this.inventory[i].name;
				$potionPotions[i].textContent = this.inventory[i].name;
			} else {
				$shopInventory[i].textContent = '';
				$potionPotions[i].textContent = '';
			}
		}
	}

	shopSell = () => {
		if(!this.inventory[this.sellPotionIndex]) {
			this.showMessage('shop','팔 아이템을 선택하세요');
			return;
		}
		this.hero.money += this.inventory[this.sellPotionIndex].money / 2;
		this.showMessage('shop',`"${this.inventory[this.sellPotionIndex].name}"을 반 값에 팔았습니다`);
		this.inventory[this.sellPotionIndex] = null;
		this.inventoryUpdate();
		this.updateHeroStat();
	}

	shopExit = () => {
		for(let i = 0 ; i < this.potionList.length; i++) {
			$shopPotions[i].style.backgroundColor = 'white';
			$shopPotions[i].style.color = 'black';
		}
		for(let i = 0 ; i < 3; i++) {
			$shopInventory[i].style.backgroundColor = 'white';
			$shopInventory[i].style.color = 'black';
		}

		this.changeScreen('game');
		this.showMessage('shop','');
		this.updateHeroStat();
	}

	updateHeroStat() {
		if (this.hero === null) {
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
			$monsterName.textContent = '';
			$monsterAtt.textContent = '';
			$monsterHp.textContent = '';
			return;
		}
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
		} else if (target === 'shop') {
			$shopMessage.textContent = text;
		}
	}
	
	quit() {
		menuClickAble = true;
		this.hero = null;
		this.monster = null;
		for(let i = 0; i< 3; i++) {
			this.inventory[i] = null;
		}
		this.updateHeroStat();
		this.updateMonsterStat();
		this.inventoryUpdate();
		this.changeScreen('start');

		this.showMessage('game','');
		this.showMessage('battle','');
		this.showMessage('start', '게임을 종료합니다');

		$menuAdventure.removeEventListener('click', this.onAdventure);
		$menuRest.removeEventListener('click', this.onRest);
    	$menuShop.removeEventListener('click',this.onShop);
		$menuExit.removeEventListener('click', this.onExit);

		$battleAttack.removeEventListener('click',this.battleAttack);
		$battleHeal.removeEventListener('click',this.battleHeal);
		$battlePotion.removeEventListener('click',this.battlePotion);
		$battleRun.removeEventListener('click',this.battleRun);
		
		$shopBuy.removeEventListener('click',this.shopBuy);
		$shopSell.removeEventListener('click',this.shopSell);
		$shopExit.removeEventListener('click',this.shopExit);
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

class Potion {
	constructor(name,money,content) {
		this.name = name;
		this.money = money;
		this.content = content;
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