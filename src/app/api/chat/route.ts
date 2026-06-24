import { NextRequest, NextResponse } from "next/server";

const SYSTEM = `You are an AI assistant for Miraziz Norpulatov's portfolio website.
Miraziz is a 15-year-old self-taught Full Stack Developer from Uzbekistan who started coding in 2025.
He knows: HTML, CSS, JavaScript, React, Node.js, Express.js, Python, MongoDB, Tailwind CSS, Git.
He does freelance web development and has built several real projects.
Answer questions about Miraziz, his skills, projects, and how to contact him.
Keep answers short, friendly and helpful. Max 2-3 sentences.
If asked about hiring, encourage them to use the contact form.
GitHub: github.com/norpulatovv`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const last = messages[messages.length - 1].content;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        system: SYSTEM,
        messages: [{ role: "user", content: last }],
      }),
    });

    const data = await res.json();
    const reply = data.content?.[0]?.text || "Sorry, I couldn't respond!";
    return NextResponse.json({ reply });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ reply: "Something went wrong. Please try again!" }, { status: 500 });
  }
}