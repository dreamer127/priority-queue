const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
		this.maxSize = maxSize;
		this.heap = new MaxHeap();
		this.length = 0;
	}

	push(data, priority) {
		if (this.length === this.maxSize) {
			throw new Error();
		}
		this.heap.push(data, priority);
		this.length += 1;
	}

	shift() {
		if (this.isEmpty()) {
			throw new Error();
		}
		let removed = this.heap.pop();
		this.length -= 1;
		return removed;
	}

	size() {
		return this.length;
	}

	isEmpty() {
		return !this.length;
	}
}

module.exports = PriorityQueue;
