import { useState } from 'react';

interface AddTodoFormProps {

onAdd: (task: string) => void;

}


export function AddTodoForm({ onAdd }: AddTodoFormProps) {

// TODO (1): zadeklaruj stan inputValue za pomocą useState<string>
const [inputValue, setInputValue] = useState<string>('');


const handleSubmit = (e: React.FormEvent) => {

e.preventDefault();

// TODO (2): sprawdź, czy inputValue.trim() nie jest pusty

// jeśli tak: wywołaj onAdd(inputValue.trim())

// i zresetuj inputValue do pustego stringa

if (inputValue.trim() !== '') {
  onAdd(inputValue.trim());
  setInputValue('');
}

};


return (

<form onSubmit={handleSubmit}>

<input value={inputValue} onChange={e => setInputValue(e.target.value)} />

<button type='submit'>Dodaj</button>

</form>

);

}