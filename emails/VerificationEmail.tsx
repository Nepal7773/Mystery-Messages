// import {
//     Html,
//     Head,
//     Font,
//     Preview,
//     Heading,
//     Row,
//     Section,
//     Text,
//     Button
// } from '@react-email/components'

// interface VerificationEmailProps {
//     username: string;
//     otp: string
// }

// export default function VerifiactionEmail({ username, otp }: VerificationEmailProps) {
//     return (
//         <Html lang="en" dir='ltr'>
//             <Head>
//                 <title>Verification Code</title>
//                 <Font
//                     fontFamily="Roboto"

//                 />
//             </Head>
//         </Html>
//     )
// }
import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

interface VerificationEmailProps {
    username: string;
    otp: string;
}



export default function VerificationEmail({
    username, otp
}: VerificationEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>
                A fine-grained personal access token has been added to your account
            </Preview>
            <Body style={main}>
                <Container style={container}>

                    <Text style={title}>
                        <strong>@{username}</strong>, a personal access was created on your
                        account.
                    </Text>

                    <Section style={section}>
                        <Text style={text}>
                            Hey <strong>{username}</strong>!
                        </Text>
                        <Text style={text}>
                            Your OTP : {otp}
                        </Text>
                    </Section>

                </Container>
            </Body>
        </Html>
    );
}



const main = {
    backgroundColor: "#ffffff",
    color: "#24292e",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
    maxWidth: "480px",
    margin: "0 auto",
    padding: "20px 0 48px",
};

const title = {
    fontSize: "24px",
    lineHeight: 1.25,
};

const section = {
    padding: "24px",
    border: "solid 1px #dedede",
    borderRadius: "5px",
    textAlign: "center" as const,
};

const text = {
    margin: "0 0 10px 0",
    textAlign: "left" as const,
};

const button = {
    fontSize: "14px",
    backgroundColor: "#28a745",
    color: "#fff",
    lineHeight: 1.5,
    borderRadius: "0.5em",
    padding: "12px 24px",
};




