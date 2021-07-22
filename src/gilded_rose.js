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

  handleAgedBrie = function(item) {
    item.decreaseSellInBy(1);

    item.increaseQualityBy(1);

    if (item.sellIn < 0) {
      item.increaseQualityBy(1);
    }

    return item
  }
  
  handleBackstagePass = function(item) {
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

  handleSulfuras = function(item) {
    return item
  }

  handleDefault = function(item) {
    item.decreaseSellInBy(1);

    item.decreaseQualityBy(1);

    if (item.sellIn < 0) {
      item.decreaseQualityBy(1);
    }

    return item
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name == 'Aged Brie') {
        this.items[i] = this.handleAgedBrie(this.items[i])
      }
      else if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
        this.items[i] = this.handleBackstagePass(this.items[i])
      }
      else {
        if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
          this.items[i] = this.handleDefault(this.items[i])
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
