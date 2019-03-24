class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!node) return;
		if (!this.left) {
			this.left = node;
			node.parent = this;
			return;
		}
		if (!this.right) {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if (this.left == node) {
			this.left = null;
			node.parent = null;
			return;
		}
		if (this.right == node) {
			this.right = null;
			node.parent = null;
			return;
		}
		throw "Child not found"
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (!this.parent) {
			return;
		}
		if (this.parent.left == this) {
			let tempChild = this.parent.right;
			this.parent.left = this.left;
			this.parent.right = this.right;
			this.left = this.parent;
			this.right = tempChild;
		}
		if (this.parent.right == this) {
			let tempChild = this.parent.left;
			this.parent.left = this.left;
			this.parent.right = this.right;
			this.left = tempChild;
			this.right = this.parent;
		}
					
		let oldParent = this.parent;
		let oldGrandParent = this.parent.parent;
		if (this.left) this.left.parent = this;
		if (this.right) this.right.parent = this;
		this.parent = oldGrandParent;
		if (oldGrandParent) {
			if (oldGrandParent.left == oldParent) oldGrandParent.left = this;
			if (oldGrandParent.right == oldParent) oldGrandParent.right = this;
		}
		if (oldParent.left) oldParent.left.parent = oldParent;
		if (oldParent.right) oldParent.right.parent = oldParent;

	}
}

module.exports = Node;
