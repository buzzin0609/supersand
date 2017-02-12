
const Quests = {
	items : {},
	add : function(Item) {
		this.items[Item.props.id] = Item;
	},
	get : function(num) {
		return this.items[num];
	}
};

export default Quests;

require('./stage1/S1Q1');
