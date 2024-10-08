import { hash } from "bcryptjs";
import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, senha, nivel } = req.body;
    const passwordHash = await hash(senha, 8);
    await prisma.user.create({
      data: {
        name,
        email,
        nivel,
        senha: passwordHash,
        status: true,
        bloqueio: false,
      },
    });
    return res.status(201).json({ name, email, senha });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Falha ao criar user tente novamente");
  }
};
export const createUserParceiro = async (req: Request, res: Response) => {
  try {
    const { name, email, senha, nivel, id } = req.body;
    const passwordHash = await hash(senha, 8);
    await prisma.user.create({
      data: {
        name,
        email,
        nivel,
        senha: passwordHash,
        status: true,
        bloqueio: false,
        parceiro: {
          connect: {
            id,
          },
        },
      },
    });
    return res.status(201).json({ name, email, senha });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Falha ao criar user tente novamente");
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findMany({
      orderBy: { name: "asc" },
      where: {
        AND: [
          {
            NOT: {
              nivel: "",
            },
            AND: [
              {
                NOT: {
                  nivel: "1",
                },
                AND: [
                  {
                    NOT: {
                      nivel: "2",
                    },
                    AND: [
                      {
                        NOT: {
                          nivel: "3",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    });
    return res.json(user);
  } catch (error) {
    return res.send(error);
  }
};
export const getUserParsa = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findMany({
      orderBy: { name: "asc" },
      where: {
        AND: [
          {
            NOT: {
              nivel: "",
            },
            AND: [
              {
                NOT: {
                  nivel: "1",
                },
                AND: [
                  {
                    NOT: {
                      nivel: "3",
                    },
                    AND: [
                      {
                        NOT: {
                          nivel: "4",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    });
    return res.json(user);
  } catch (error) {
    return res.send(error);
  }
};
export const getUserSuporte = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findMany({
      orderBy: { name: "asc" },
      where: {
        AND: [
          {
            NOT: {
              nivel: "",
            },
            AND: [
              {
                NOT: {
                  nivel: "1",
                },
                AND: [
                  {
                    NOT: {
                      nivel: "2",
                    },
                    AND: [
                      {
                        NOT: {
                          nivel: "4",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    });
    return res.json(user);
  } catch (error) {
    return res.send(error);
  } 
};
export const getUserSuporteParceiro = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findMany({
      where: {
        id: String(id),
        AND: [
          {
            NOT: {
              nivel: "1",
            },
            AND: [
              {
                NOT: {
                  nivel: "2",
                },
                AND: [
                  {
                    NOT: {
                      nivel: "4",
                    },
                    AND: [
                      {
                        NOT: {
                          nivel: "",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      include: {
        parceiro: { select: { nome: true, email: true, n_fantasia: true } },
      },
    });
    return res.json(user);
  } catch (error) {
    return res.send(error);
  }
};

export const getUserCliente = async (req: Request, res: Response) => {
  const { parceiro_id } = req.params;
  try {
    const user = await prisma.user.findMany({
      where: {
        parceiro_id: Number(parceiro_id),
        AND: [
          {
            NOT: {
              nivel: "1",
            },
            AND: [
              {
                NOT: {
                  nivel: "2",
                },
                AND: [
                  {
                    NOT: {
                      nivel: "3",
                    },
                    AND: [
                      {
                        NOT: {
                          nivel: "",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    });
    return res.json(user);
  } catch (error) {
    return res.send(error);
  }
};

export const getUserCount = async (req: Request, res: Response) => {
  try {
    const count = await prisma.user.count();
    return res.status(201).json(count);
  } catch (error) {
    return res.send(error);
  }
};
export const getUSerDesativado = async (req: Request, res: Response) => {
  try {
    const count = await prisma.user.count({ where: { status: false } });
    return res.status(201).json(count);
  } catch (error) {
    return res.send(error);
  }
};
export const getCountParsa = async (req: Request, res: Response) => {
  try {
    const count = await prisma.user.count({
      where: {
        nivel: "2",
      },
    });
    return res.status(201).json(count);
  } catch (error) {
    return res.send(error);
  }
};
export const getCountSuporte = async (req: Request, res: Response) => {
  try {
    const count = await prisma.user.count({
      where: {
        nivel: "3",
        status: true,
      },
    });
    return res.status(201).json(count);
  } catch (error) {
    return res.send(error);
  }
};
export const getCountSuporteDesativo = async (req: Request, res: Response) => {
  try {
    const count = await prisma.user.count({
      where: {
        nivel: "3",
        status: false,
      },
    });
    return res.status(201).json(count);
  } catch (error) {
    return res.send(error);
  }
};

export const userNivel = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const nivel = await prisma.user.findUnique({
      where: {
        id: String(id),
      },
      select: {
        nivel: true,
        parceiro_id: true,
      },
    });
    return res.json(nivel);
  } catch (error) {
    return res.send(error);
  }
};
export const userNivelEmail = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const nivel = await prisma.user.findUnique({
      where: {
        email: String(email),
      },
      select: {
        nivel: true,
      },
    });
    return res.json(nivel);
  } catch (error) {
    return res.send(error);
  }
};

export const userNome = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const nivel = await prisma.user.findUnique({
      where: {
        id: String(id),
      },
      select: {
        name: true,
      },
    });
    return res.json(nivel);
  } catch (error) {
    return res.send(error);
  }
};

export const userPutId = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const userData = await prisma.user.findUnique({
      where: {
        id: String(id),
      },
      select: {
        status: true,
      },
    });
    const updatedUser = await prisma.user.update({
      where: { id: String(id) || undefined },
      data: { status: !userData?.status },
    });
    res.json(updatedUser);
  } catch (error) {
    res.json({ error: `Não existe usuario com esse id${id}` });
  }
};

export const userPutIdBloqueio = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const userData = await prisma.user.findUnique({
      where: {
        id: String(id),
      },
      select: {
        bloqueio: true,
      },
    });
    const updatedUser = await prisma.user.update({
      where: { id: String(id) || undefined },
      data: { bloqueio: !userData?.bloqueio },
    });
    res.json(updatedUser);
  } catch (error) {
    res.json({ error: `Não existe usuario com esse id${id}` });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userData = await prisma.user.findUnique({
      where: {
        id: String(id),
      },
    });
    const updatedUser = await prisma.user.update({
      where: { id: String(id) || undefined },
      data: {
        nivel: "",
        status: false,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    res.json({ error: `Não foi possível deletar esse usuário` });
  }
};

export const getSeachUser = async (req: Request, res: Response) => {
  const { consulta } = req.body;
  try {
    const cliente = await prisma.user.findMany({
      orderBy: { name: "asc" },
      where: {
        OR: [
          {
            name: {
              startsWith: consulta,
            },
          },
          {
            OR: [
              {
                email: {
                  startsWith: consulta,
                },
              },
              {
                OR: [
                  {
                    nivel: {
                      startsWith: consulta,
                    },
                  },
                ],
                AND: [
                  {
                    NOT: {
                      nivel: "1",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    });
    return res.json(cliente);
  } catch (error) {
    return res.send(error);
  }
};

export const getSeachUserParceiro = async (req: Request, res: Response) => {
  const { parceiro_id } = req.params;
  const { consulta } = req.body;
  try {
    const cliente = await prisma.user.findMany({
      where: {
        parceiro_id: Number(parceiro_id),
        OR: [
          {
            name: {
              startsWith: consulta,
            },
          },
          {
            OR: [
              {
                email: {
                  startsWith: consulta,
                },
              },
              {
                OR: [
                  {
                    nivel: {
                      startsWith: consulta,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    });
    return res.json(cliente);
  } catch (error) {
    return res.send(error);
  }
};

export const getUserParceiroId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userParceiro = await prisma.user.findUniqueOrThrow({
      where: { id: String(id) },
      include: { parceiro: { select: { id: true } } },
    });
    return res.json(userParceiro);
  } catch (error) {
    return res.send(error);
  }
};

export const getUserContadorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userContador = await prisma.user.findUniqueOrThrow({
      where: { id: String(id) },
      include: { contador: { select: { id: true } } },
    });
    return res.json(userContador);
  } catch (error) {
    return res.send(error);
  }
};

// app.post('/change-password',$2a$08$fiYr.jQ1w/2FWb5fv/16Y.9hOuX.10V5/wTmhC91kfACnBx4CBNEi/$2a$08$WJo5URc2qm7NY3DY1d40WuetWOJzrZORlA31ei/UaRji/uSMiCroG
export const updateSenha = async (req: Request, res: Response) => {
  try {
    const { id, senha } = req.body;

    const passwordHash = await hash(senha, 8);

    await prisma.user.update({
      where: { id: String(id) }, 
      data: {
        senha: passwordHash,
      },
    });
    res.status(200).json({ message: "Senha alterada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao alterar a senha." });
  }
};
