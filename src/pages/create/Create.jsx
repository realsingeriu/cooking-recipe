import './Create.css';

export default function Create() {
  const Create = () => {
    const [title, setTitle] = useState('');
    const [method, setMethod] = useState('');
    const [cookingTime, setCookingTime] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(title, method, cookingTime);
    };

  return (
    <div className="create">
      <h2 className="page-title">새 레시피를 추가하세요</h2>
      <form onSubmit={?}>

        <label>
          <span>요리 제목:</span>
          <input
            type="text"
            onChange={(e) => ? (e.target.value)}
            value={title}
            required
          />
        </label>

        {/* recipe ingredients here */}

        <label>
          <span>요리 방법:</span>
          <textarea
            onChange={(e) => ? (e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>쿠킹 타임 (분):</span>
          <input
            type="number"
            onChange={(e) => ? (e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button className="btn">추가</button>
      </form>
    </div>
  );
};
