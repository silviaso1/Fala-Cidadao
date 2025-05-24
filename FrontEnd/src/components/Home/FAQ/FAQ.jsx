import React, { useState } from 'react';
import { Container, Accordion, Button } from 'react-bootstrap';
import './FAQ.scss';

const FAQ = () => {
  const [activeKey, setActiveKey] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const allFaqs = [
    {
      question: ".....",
      answer: "....."
    },
    {
      question: ".....",
      answer: "....."
    },

  ];

  const displayedFaqs = showAll ? allFaqs : allFaqs.slice(0, 4);

  return (
    <section id="faq" className="faq-section">
      <Container>
        <h2 className="section-title">
        
          Perguntas Frequentes
        </h2>

        
        <Accordion activeKey={activeKey} onSelect={(e) => setActiveKey(e)}>
          {displayedFaqs.map((faq, index) => (
            <Accordion.Item 
              key={index} 
              eventKey={index.toString()}
              className="faq-item"
            >
              <Accordion.Header className="faq-header">
                <div className="faq-question-wrapper">
                  <span className="faq-question">{faq.question}</span>
                  
                </div>
              </Accordion.Header>
              <Accordion.Body className="faq-answer">
                {faq.answer}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>

        {!showAll && allFaqs.length > 5 && (
          <div className="text-center mt-4">
            <Button 
              variant="outline-primary" 
              onClick={() => setShowAll(true)}
              className="show-more-btn"
            >
              Mostrar mais perguntas
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default FAQ;