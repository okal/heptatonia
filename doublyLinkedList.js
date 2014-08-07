var ListNode = function(value) {
	this.value = value
}

exports.DoublyLinkedList = function() {
	this.head = undefined
	this.tail = undefined
	this.size = 0
	this.push = function(value) {
		var listNode = new ListNode(value)
		if(this.size == 0) {
			this.head = listNode
			this.tail = listNode
		}
		this.tail.next = listNode
		listNode.prev = this.tail
		listNode.next = this.head
		this.tail = listNode
		this.head.prev = this.tail
		this.size++
	}
	this.getAt = function(index) {
		var node = this.head
		var normalizedIndex = index % this.size
		while(normalizedIndex < 0) {
			normalizedIndex += this.size
		}
		for(var i = 0; i <= normalizedIndex; i++) {
			if((i % this.size) == normalizedIndex) {
				return node
			} else {
				node = node.next
			}
		}
	}
}
