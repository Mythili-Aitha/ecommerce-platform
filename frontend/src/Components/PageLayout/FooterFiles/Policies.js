import { Card, CardContent, CardHeader, Typography, Box } from "@mui/material";
import React from "react";

export default function Policies() {
  return (
    <Card>
      <CardHeader
        title={<Typography variant="h5">Terms and Policies</Typography>}
      />
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <p>
            <strong>TERMS AND CONDITIONS</strong>
          </p>
          <h3>1. Introduction</h3>
          <p>
            Welcome to Daisy! These Terms and Conditions outline the rules and
            regulations for the use of our website and services. By accessing or
            using our website, you accept these terms in full. If you do not
            agree to these terms, please do not use our services.
          </p>

          <h3>2. Intellectual Property Rights</h3>
          <p>
            All content, trademarks, logos, and intellectual property displayed
            on this website are owned by Daisy or its licensors. You are not
            permitted to use, reproduce, or distribute any of our content
            without prior written permission.
          </p>

          <h3>3. User Obligations</h3>
          <p>By using our website, you agree to:</p>
          <ul>
            <li>Provide accurate and up-to-date information.</li>
            <li>Not engage in any unlawful activities.</li>
            <li>Respect the intellectual property rights of others.</li>
            <li>Not attempt to hack, disrupt, or manipulate our services.</li>
          </ul>

          <h3>4. Privacy Policy</h3>
          <p>
            Your use of our website is also governed by our Privacy Policy,
            which explains how we collect, use, and protect your personal data.
            Please review our Privacy Policy for more details.
          </p>

          <h3>5. Limitation of Liability</h3>
          <p>
            Daisy shall not be held liable for any direct, indirect, incidental,
            or consequential damages arising from the use of our services,
            including but not limited to errors, interruptions, or loss of data.
          </p>

          <h3>6. Third-Party Links</h3>
          <p>
            Our website may contain links to third-party websites. We are not
            responsible for the content, privacy policies, or practices of any
            third-party sites and encourage you to review their terms and
            policies before engaging with them.
          </p>

          <h3>7. Modifications to Terms</h3>
          <p>
            We reserve the right to update or modify these Terms and Conditions
            at any time. Any changes will be posted on this page, and your
            continued use of our website after modifications indicate your
            acceptance of the revised terms.
          </p>

          <h3>8. Termination</h3>
          <p>
            We reserve the right to terminate or suspend access to our services
            at any time without prior notice if you violate these Terms and
            Conditions.
          </p>

          <h3>9. Governing Law</h3>
          <p>
            These Terms and Conditions shall be governed and interpreted under
            the laws of Daisy. Any disputes arising from these terms shall be
            resolved in the courts of the United States.
          </p>

          <h3>10. Contact Information</h3>
          <p>
            If you have any questions about these Terms and Conditions, please
            contact us at <strong>+1 (999)-999-9999</strong>.
          </p>
        </Box>
      </CardContent>
    </Card>
  );
}
