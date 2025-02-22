
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { LoginForm } from "@/components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6">Вход в аккаунт</h1>
          <LoginForm />
          <p className="mt-4 text-gray-600">
            Нет аккаунта?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
