const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.heapSize++;
	}

	pop() {
		if (!this.isEmpty()) {
			const root = this.detachRoot();
			this.restoreRootFromLastInsertedNode(root);
			this.shiftNodeDown(this.root);
			this.heapSize--;
			return root.data;
		};
	}

	detachRoot() {
		let root = this.root;
		if (this.parentNodes[0] == root) this.parentNodes.shift();
		this.root = null;
		return root;
	}


	restoreRootFromLastInsertedNode(detached) {
		if (this.parentNodes[0] == detached) this.parentNodes.shift();
		if (this.parentNodes.size == 0) return;
		let node = this.parentNodes.pop();
		if (node == undefined) return;
		if (node.parent && node.parent.right == node) {
			if (node.parent != detached) 
				this.parentNodes.unshift(node.parent); 
			else
				this.parentNodes.unshift(node);
		}
		node.remove();
		node.appendChild(detached.left);
		node.appendChild(detached.right);
		this.root = node;
	}



	size() {
		return this.heapSize;
	}

	isEmpty() {
		return this.root === null;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	insertNode(node) {
		if (!this.root) {
			this.root = node;
			this.parentNodes = [this.root]
			return;
		}
		let tbp = this.parentNodes[0];
		tbp.appendChild(node);
		if (tbp.right) this.parentNodes.shift();
		this.parentNodes.push(node);
	}

	shiftNodeUp(node) {
		if (!node.parent) {
			this.root = node;
			return;
		}
		if (node.parent.priority >= node.priority) return;
		let idx = this.parentNodes.indexOf(node);
		if (idx >= 0) {
			let idx_2 = this.parentNodes.indexOf(node.parent);
			if (idx_2 >=0 ) this.parentNodes[idx_2] = node;
			this.parentNodes[idx] = node.parent;
		}
		node.swapWithParent();
		this.shiftNodeUp(node);
	}


	shiftNodeDown(node) {
		if (!node) return;
		let rP = -Infinity;
		let lP = -Infinity;
		if (node.left) lP = node.left.priority;
		if (node.right) rP = node.right.priority;
		if (Math.max(lP, rP) <= node.priority) return;
		if (lP == Math.max(lP, rP)) {
			this.shiftNodeUp(node.left);
		} else {
			this.shiftNodeUp(node.right);
		}
		this.shiftNodeDown(node);
	}
}

module.exports = MaxHeap;
