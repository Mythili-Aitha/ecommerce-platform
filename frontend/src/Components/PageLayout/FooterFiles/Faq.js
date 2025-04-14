import { Card, CardContent, Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const faqData = [
  {
    question: "What is Daisy?",
    answer:
      "Daisy is an online shopping platform that offers a wide range of products across categories such as fashion, groceries, electronics, footwear, home essentials, and more.",
  },
  {
    question: "Do I need to create an account to shop?",
    answer:
      "While you can browse products without an account, creating an account allows you to track orders, save addresses, and enjoy a faster checkout experience.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept credit/debit cards, net banking, digital wallets, and cash on delivery (COD) where applicable.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you will receive a tracking link via email or SMS to monitor your order’s progress.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a hassle-free return and refund policy on eligible products within a specified time frame. Check the product page for return eligibility.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Box sx={{ justifyContent: "center" }}>
      <Typography>
        {" "}
        <strong>Frequently Asked Questions</strong>
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
          padding: 2,
        }}
      >
        {faqData.map((faq, index) => (
          <Card
            key={index}
            className="border rounded-lg p-2 shadow-sm"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: 2,
            }}
          >
            <Button
              variant="ghost"
              className="w-full flex justify-between items-center text-left text-lg font-medium p-4"
              onClick={() => toggleFAQ(index)}
            >
              <strong>{faq.question}</strong>
              {openIndex === index ? (
                <ExpandLessIcon size={20} />
              ) : (
                <ExpandMoreIcon size={20} />
              )}
            </Button>
            {openIndex === index && (
              <CardContent className="p-4 border-t text-gray-600">
                {faq.answer}
              </CardContent>
            )}
          </Card>
        ))}
      </Box>
    </Box>
  );
}
