/**
 * 🤖 CHAT API ROUTE - Anthropic Claude Integration
 *
 * Endpoint pentru conversații cu Barista Bot
 * POST /api/chat
 * Body: { message: string, conversationHistory?: Message[] }
 */

import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { KNOWLEDGE_BASE } from '@/lib/knowledge-base';

// Inițializare Anthropic client
function getAnthropic() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

// 📚 SYSTEM PROMPT - din knowledge-base.ts (personalitate + date cafenea)
const SYSTEM_PROMPT = KNOWLEDGE_BASE;

// 🎯 QUICK REPLIES CONTEXTUALE
function generateQuickReplies(userMessage: string, botResponse: string): string[] {
  const lower = (userMessage + ' ' + botResponse).toLowerCase();

  if (lower.includes('rezerv') || lower.includes('masă')) {
    return ['Câte persoane?', 'Deschide formularul', 'Văd meniul'];
  }
  if (lower.includes('vegan') || lower.includes('plant')) {
    return ['Oat Milk Latte', 'Almond Cappuccino', 'Cold Brew', 'Tot meniul'];
  }
  if (lower.includes('puternic') || lower.includes('strong') || lower.includes('cafein')) {
    return ['Espresso', 'Nitro Cold Brew', 'Flat White'];
  }
  if (lower.includes('dulce') || lower.includes('desert')) {
    return ['Mocha', 'Affogato', 'Brownie cu Nuci'];
  }
  if (lower.includes('rece') || lower.includes('cold') || lower.includes('iced')) {
    return ['Cold Brew', 'Iced Latte', 'Nitro Cold Brew'];
  }
  if (lower.includes('meniu') || lower.includes('categor')) {
    return ['☕ Espresso', '🌱 Vegan', '❄️ Cold', '🥐 Patiserie'];
  }
  if (lower.includes('program') || lower.includes('unde') || lower.includes('adres')) {
    return ['Fac o rezervare', 'Văd meniul', 'Pet-friendly?'];
  }

  return ['Vreau cafea', 'Fac o rezervare', 'Văd meniul', 'Info locație'];
}

// 🚀 POST HANDLER
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationHistory = [] } = body;
    const trimmedMessage = typeof message === 'string' ? message.trim() : '';

    if (!trimmedMessage) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not configured in .env.local' },
        { status: 500 }
      );
    }

    // Construim istoricul — ultimele 6 mesaje ca context
    const history = conversationHistory
      .slice(-6)
      .map((msg: { sender: string; text: string }) => ({
        role: msg.sender === 'user' ? ('user' as const) : ('assistant' as const),
        content: msg.text,
      }));

    // API Call către Claude
    const response = await getAnthropic().messages.create({
      model: process.env.ANTHROPIC_MODEL?.trim() || 'claude-sonnet-4-20250514',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [
        ...history,
        { role: 'user', content: trimmedMessage },
      ],
    });

    const botResponse =
      response.content[0]?.type === 'text'
        ? response.content[0].text
        : 'Scuze, nu am înțeles. Poți repeta?';

    const quickReplies = generateQuickReplies(trimmedMessage, botResponse);

    return NextResponse.json({
      response: botResponse,
      quickReplies,
      usage: {
        inputTokens: response.usage?.input_tokens,
        outputTokens: response.usage?.output_tokens,
      },
    });
  } catch (error: any) {
    console.error('Anthropic API Error:', {
      message: error?.message,
      status: error?.status,
      type: error?.type,
      model: process.env.ANTHROPIC_MODEL?.trim() || 'claude-sonnet-4-20250514',
    });

    if (error.status === 401) {
      return NextResponse.json(
        { error: 'Invalid ANTHROPIC_API_KEY. Verifică .env.local' },
        { status: 401 }
      );
    }

    if (error?.status === 400) {
      return NextResponse.json(
        {
          error: 'Anthropic request invalid',
          details: error?.message || 'Verifică modelul și payload-ul trimis',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to get response from Claude',
        details: error?.message || 'Unknown Anthropic error',
      },
      { status: error?.status || 500 }
    );
  }
}
