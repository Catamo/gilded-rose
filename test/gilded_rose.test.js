const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  it("should add items to the shop", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it("should lower the Quality and SellIn values at the end of each day", function () {
    const gildedRose = new Shop([new Item("testaroo", 1, 2)]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].sellIn).toBe(0);
    expect(updatedItems[0].quality).toBe(1);
  })

  it("should decrease quality twice as fast when item SellIn has passed", function () {
    const gildedRose = new Shop([new Item("twicy", -1, 4)]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toBe(2);
  });

  it("should never decrease the Quality of an item to a negative value", function () {
    const gildedRose = new Shop([new Item("pessimist", 0, 0)]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toBe(0);
  })

  it("should increase Quality value of 'Aged Brie' as it gets older", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 3)]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toBe(4);
  })

  it("should never have an item with a Quality value over 50", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 48)]);
    gildedRose.updateQuality(); // day 1
    gildedRose.updateQuality(); // day 2
    const updatedItems = gildedRose.updateQuality(); // day 3
    expect(updatedItems[0].quality).toBe(50);
  })

  // As a note, I wasn't quite sure of this feature, the wording of the requirement was weird
  // I understood it only after making the test, running it and seeing the code
  it("should never decrease the SellIn or Quality values of 'Sulfuras' as it is legendary", function () {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 3)]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].sellIn).toBe(1);
    expect(updatedItems[0].quality).toBe(3);
  })

  it("should increase the Quality of 'Backstage passes' by 2 when there are 10 days or less", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 7, 3)]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toBe(5);
  })

  it("should increase the Quality of 'Backstage passes' by 3 when there are 5 days or less", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 3, 3)]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toBe(6);
  })

  it("should drop the Quality of 'Backstage passes' to 0 after sellIn date has passed", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 3)]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toBe(0);
  })
});
