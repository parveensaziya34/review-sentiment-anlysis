import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css';


// Task 3: Tooltip Component
const Tooltip = ({ text, topic }) => {
  return (
    <span className="tooltip">
      {text}
      <span className="tooltiptext">{topic}</span>
    </span>
  );
};

// Task 2 and 5: ReviewHighlighter Component
const ReviewHighlighter = ({ analytics }) => {
  const getColor = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return '#D9F2DD'; // Light green
      case 'negative':
        return '#F2DBD9'; // Light red
      case 'mixed':
        return '#e8bd6d3d'; // Light pink
      case 'neutral':
        return '#eaf09b6b'; // Light yellow
      default:
        return 'white';
    }
  };

  const highlightText = (text, indices, sentiment) => {
    const [start, end] = indices || [0, text.length];
    return (
      <>
        {text.slice(0, start)}
        <span style={{ backgroundColor: getColor(sentiment), padding: '2px 4px', margin: '2px' }}>
          {text.slice(start, end)}
        </span>
        {text.slice(end)}
      </>
    );
  };

  return (
    <div>
      {analytics.map((item, index) => (
        <Tooltip key={index} text={highlightText(item.sentences[0], item.highlight_indices[0], item.sentiment)} topic={item.topic}>
          <span>{highlightText(item.sentences[0], item.highlight_indices[0], item.sentiment)}</span>
        </Tooltip>
      ))}
    </div>
  );
};

// Task 1: ReviewList Component
const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Mocking the data since there's no actual path in CodePen
    const mockData = [
      {
        reviewer_name: "Barbara",
        content: "We had a relaxing time ❤.\n\n[Positive]: The spa was excellent. We had a wonderful relaxing time! [Negative]: The food choices at the Rowe restaurant. Parking should be included in your stay because you pay a lot to stay here already.",
        raw_content: "We had a relaxing time ❤.\n\n[Positive]: The spa was excellent. We had a wonderful relaxing time! [Negative]: The food choices at the Rowe restaurant. Parking should be included in your stay because you pay a lot to stay here already.",
        date: "05 Dec 2023",
        rating_review_score: 10.0,
        out_of: 10.0,
        source_language: "en",
        source: {
          name: "booking.com",
          icon: "https://reviewmagic.innspire.com:8001/media/sources/booking3.png",
        },
        analytics: [
          {
            category: "spa",
            topic: "spa",
            phrases: ["spa", "spa"],
            sentences: ["The spa was excellent"],
            sentiment: "Positive",
            highlight_indices: [[10, 29, "Positive"]],
          },
          {
            category: "facilities",
            topic: "facilities",
            phrases: ["parking", "parking"],
            sentences: ["Parking should be included in your stay because you pay a lot to stay here already"],
            sentiment: "Negative",
            highlight_indices: [[32, 78, "Negative"]],
          },
        ],
      }
    ];
    setReviews(mockData);
    // In a real application, you would use:
    // fetch('path-to-reviewsData.json')
    //   .then(response => response.json())
    //   .then(data => setReviews(data))
    //   .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  return (
    <div>
      {reviews.map((review, index) => (
        <div key={index} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>{review.reviewer_name}</h3>
          <p>{review.content}</p>
          <p>
            <strong>Date:</strong> {review.date}
          </p>
          <p>
            <strong>Rating:</strong> {review.rating_review_score} / {review.out_of}
          </p>
          <img src={review.source.icon} alt={review.source.name} style={{ width: '50px', height: '50px' }} />
          <ReviewHighlighter analytics={review.analytics} />
        </div>
      ))}
    </div>
  );
};

// Main App Component
function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Review Sentiment Analysis</h1>
      <ReviewList />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
// const styleSheet = document.createElement("style");
// styleSheet.type = "text/css";
// styleSheet.innerText = styles;
// document.head.appendChild(styleSheet);
const styles = `
  .tooltip {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }

  .tooltiptext {
    visibility: hidden;
    width: 140px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 125%; 
    left: 50%;
    margin-left: -70px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default App;

