// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

struct Todo {
    string text;
    bool completed;
}

contract Todos {
    // An array of 'Todo' structs
    Todo[] public todos;

    function create(string calldata _text) public {
        todos.push(Todo(_text, false));
    }

    // Solidity automatically created a getter for 'todos' so
    // you don't actually need this function.
    function get(
        uint256 _index
    ) public view returns (string memory text, bool completed) {
        Todo storage todo = todos[_index];
        return (todo.text, todo.completed);
    }

    // update text
    function updateText(uint256 _index, string calldata _text) public {
        Todo storage todo = todos[_index];
        todo.text = _text;
    }

    // update completed
    function toggleCompleted(uint256 _index) public {
        Todo storage todo = todos[_index];
        todo.completed = !todo.completed;
    }
}
