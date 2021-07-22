class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  increaseQualityBy(number) {
    if (this.quality + number <= 50) {
      this.quality += number;
    }
  }

  decreaseQualityBy(number) {
    if (this.quality - number >= 0) {
      this.quality -= number;
    }
  }

  decreaseSellInBy(number) {
    this.sellIn -= number;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  handleAgedBrie = function (item) {
    item.decreaseSellInBy(1);

    item.increaseQualityBy(1);

    if (item.sellIn < 0) {
      item.increaseQualityBy(1);
    }

    return item
  }

  handleBackstagePass = function (item) {
    item.decreaseSellInBy(1);

    item.increaseQualityBy(1);

    if (item.sellIn < 11) {
      item.increaseQualityBy(1);
    }
    if (item.sellIn < 6) {
      item.increaseQualityBy(1);
    }

    if (item.sellIn < 0) {
      item.decreaseQualityBy(item.quality);
    }

    return item
  }

  handleSulfuras = function (item) {
    return item
  }

  handleDefault = function (item) {
    item.decreaseSellInBy(1);

    item.decreaseQualityBy(1);

    if (item.sellIn < 0) {
      item.decreaseQualityBy(1);
    }

    return item
  }

  updateItem(item) {
    switch (item.name) {
      case 'Aged Brie':
        return this.handleAgedBrie(item);
      case 'Backstage passes to a TAFKAL80ETC concert':
        return this.handleBackstagePass(item);
      case 'Sulfuras, Hand of Ragnaros':
        return this.handleSulfuras(item);
      default:
        return this.handleDefault(item)
    }
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i] = this.updateItem(this.items[i])
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
