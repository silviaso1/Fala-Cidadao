import { useState } from 'react';
import { Container, Accordion, Button } from 'react-bootstrap';
import './FAQ.scss';

const FAQ = () => {
  const [activeKey, setActiveKey] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const allFaqs = [
    {
      question: "O que é o Fala Cidadão?",
      answer: "O Fala Cidadão é um canal de comunicação criado para receber reclamações e denúncias de problemas urbanos."
    },   
    {
      question: "Existe algum custo para usar o Fala Cidadão?",
      answer: "Não. O serviço é totalmente gratuito e acessível a qualquer cidadão."
    },
     {
      question: "Posso fazer várias manifestações sobre o mesmo assunto?",
      answer: "Pode, mas é recomendável acompanhar e verificar primeiro se haverá resolução."
    },

    {
      question: "Posso usar o Fala Cidadão em dispositivos móveis?",
      answer: "Sim! O sistema é responsivo e pode ser acessado por celular, tablet ou computador."
    },
    {
      question: "Como posso acompanhar o status da minha manifestação?",
      answer: "Você pode acompanhar o status diretamente no site, acessando sua conta e verificando suas manifestações."
    },
    {
      question: "Quais tipos de problemas posso denunciar?",
      answer: "Você pode denunciar problemas como buracos nas ruas, falta de iluminação pública, lixo acumulado, entre outros."
    },
   
  ];

  const displayedFaqs = showAll ? allFaqs : allFaqs.slice(0, 4);

  return (
    <section id="faq" className="faq-section">
      <Container>
        <h2 className="section-title"> Perguntas Frequentes </h2>

        
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