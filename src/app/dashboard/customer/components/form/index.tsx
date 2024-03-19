"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/Input";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  email: z.string().email("E-mail inválido").min(5, "O email é obrigatório."),
  phone: z.string().refine(
    (phone) => {
      return (
        /^(?:\(\d{2}\)\s?)?\d{9}$/.test(phone) ||
        /^\d{2}\s\d{9}$/.test(phone) ||
        /^\d{11}$/.test(phone)
      );
    },
    {
      message: "O número de telefone deve ser (99) 999999999.",
    }
  ),
  address: z.string(),
});

type FormData = z.infer<typeof schema>;

export function NewCustomerForm({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  
  const router = useRouter();

  async function onSubmit(data: FormData) {
    await api.post("/api/customer", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      userId: userId,
    });

    router.refresh();
    router.replace("/dashboard/customer");
  }

  return (
    <form
      className="flex flex-col gap-2 mt-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="mb-1 text-lg font-medium" htmlFor="">
        Nome completo
      </label>
      <Input
        type="text"
        placeholder="Digite o nome completo"
        name="name"
        error={errors.name?.message}
        register={register}
      />
      <section className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium" htmlFor="">
            E-mail
          </label>
          <Input
            type="email"
            placeholder="Digite o e-mail"
            name="email"
            error={errors.email?.message}
            register={register}
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium" htmlFor="">
            Telefone
          </label>
          <Input
            type="text"
            placeholder="Digite o telefone (DD) 999999999"
            name="phone"
            error={errors.phone?.message}
            register={register}
          />
        </div>
      </section>
      <label className="mb-1 text-lg font-medium" htmlFor="">
        Endereço
      </label>
      <Input
        type="text"
        placeholder='Digite o endereço "Rua, número, bairro"'
        name="address"
        error={errors.address?.message}
        register={register}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white h-11 rounded font-medium mt-2"
      >
        Cadastrar
      </button>
    </form>
  );
}
