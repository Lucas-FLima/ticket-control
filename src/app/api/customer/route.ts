import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Acesso negado." }, { status: 401 });
  }

  const { name, email, phone, address = "", userId } = await req.json();

  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: "Nome, email, telefone são obrigatórios." },
      { status: 400 }
    );
  }

  try {
    await prismaClient.customer.create({
      data: {
        name,
        email,
        phone,
        address: address ? address : "",
        userId: userId,
      },
    });

    return NextResponse.json(
      {
        message: "Cliente criado com sucesso.",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar cliente." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Acesso negado." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID é obrigatório." }, { status: 400 });
  }

  const findTickets = await prismaClient.ticket.findFirst({
    where: {
      customerId: id as string,
    },
  });

  if (findTickets) {
    return NextResponse.json(
      { error: "Cliente possui tickets, não pode ser deletado." },
      { status: 400 }
    );
  }

  try {
    await prismaClient.customer.delete({
      where: {
        id: id as string,
      },
    });

    return NextResponse.json(
      {
        message: "Cliente deletado com sucesso.",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar cliente." },
      { status: 500 }
    );
  }
}
