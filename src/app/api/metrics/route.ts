import { NextResponse } from "next/server";

type MockUser = { id: number; name: string };
type MockPost = { id: number; userId: number };
type MockTodo = { completed: boolean };

const upstream = "https://jsonplaceholder.typicode.com";

export async function GET() {
  try {
    const [usersResponse, postsResponse, todosResponse] = await Promise.all([
      fetch(`${upstream}/users`, { next: { revalidate: 300 } }),
      fetch(`${upstream}/posts`, { next: { revalidate: 300 } }),
      fetch(`${upstream}/todos`, { next: { revalidate: 300 } }),
    ]);

    if (!usersResponse.ok || !postsResponse.ok || !todosResponse.ok) throw new Error("Mock API unavailable");

    const [users, posts, todos] = (await Promise.all([
      usersResponse.json(), postsResponse.json(), todosResponse.json(),
    ])) as [MockUser[], MockPost[], MockTodo[]];
    const completedRate = todos.filter((todo) => todo.completed).length / todos.length;
    const activeCustomers = users.map((user, index) => ({
      name: user.name,
      orders: posts.filter((post) => post.userId === user.id).length + index + 2,
    }));

    return NextResponse.json({
      source: "JSONPlaceholder", syncedAt: new Date().toISOString(), activeCustomers,
      metrics: { revenue: 128340 + posts.length * 92, orders: 1684 + posts.length * 3, conversionRate: Number((2.81 + completedRate * 1.22).toFixed(2)), repeatRate: Number((22 + completedRate * 14).toFixed(1)) },
    });
  } catch {
    return NextResponse.json({
      source: "Demo fallback", syncedAt: new Date().toISOString(), activeCustomers: [],
      metrics: { revenue: 137540, orders: 1984, conversionRate: 3.42, repeatRate: 29.0 },
    });
  }
}

