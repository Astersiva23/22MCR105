import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = [
          'http://20.244.56.144/numbers/primes',
          'http://20.244.56.144/numbers/fibo',
          'http://20.244.56.144/numbers/odd'
        ];

        const responses = await Promise.all(urls.map(url => axios.get(url)));
        const allNumbers = responses.flatMap(response => response.data.numbers);

        const uniqueNumbers = removeDuplicates(allNumbers);
        const sortedNumbers = sortData(uniqueNumbers);

        setData(sortedNumbers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const removeDuplicates = numbers => {
    return numbers.filter((number, index) => numbers.indexOf(number) === index);
  };

  const sortData = data => {
    return [...data].sort((a, b) => a - b);
  };

  const display = element => element + ',';

  return (
    <>
      <div>{`{`}</div>
      <div>&ensp;&ensp;&ensp; "numbers": [{data.map(display)}]</div>
      <div>{`}`}</div>
    </>
  );
}

export default App;
