export default class Observer {
	constructor(eventName) {
		if (!eventName) throw new Error("更新事件名称不能为空");
		this.eventName = eventName;
	    this.options = [];
	}
	addSub(obj) {
		return this.options.push(obj);
	}
	removeSub(obj) {
		let index = this.options.findIndex(vm => vm === obj);
		index !== -1 && this.options.splice(index, 1);
	}
	notify() {
		this.options.forEach(vm => {
			vm[this.eventName](arguments)
		});
	}
}