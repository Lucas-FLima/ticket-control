import { Container } from "@/components/Container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import TicketItem from "./components/ticket";
import prismaClient from "@/lib/prisma";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const tickets = await prismaClient.ticket.findMany({
    where: {
      userId: session.user.id,
      status: "ABERTO",
    },
    include: {
      customer: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Chamados</h1>
          <Link
            className="px-4 py-2 rounded bg-blue-500 text-white"
            href="/dashboard/new"
          >
            Cadastrar
          </Link>
        </div>
        <table className="min-w-full my-10">
          <thead>
            <tr>
              <th className="text-left pl-2">CLIENTE</th>
              <th className="text-left hidden sm:block">DATA CADASTRO</th>
              <th className="text-left">STATUS</th>
              <th className="text-right">AÇÃO</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <TicketItem
                key={ticket.id}
                ticket={ticket}
                customer={ticket.customer}
              />
            ))}
          </tbody>
        </table>
        {tickets.length === 0 && (
          <div className="text-center text-xl font-bold">
            Nenhum chamado aberto
          </div>
        )}
      </main>
    </Container>
  );
}
