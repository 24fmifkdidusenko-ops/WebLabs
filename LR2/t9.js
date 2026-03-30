function showTitle(title, realm) {
    console.log(`9) ${this.name} - ${title} of ${realm}`);
}

const hero = { name: "Illidan" };

showTitle.call(hero, "Betrayer", "Outland");
showTitle.apply(hero, ["Demon Hunter", "Azeroth"]);

const boundFunc = showTitle.bind(hero);
boundFunc("Lord", "Black Temple");