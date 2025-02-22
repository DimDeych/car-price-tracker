
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { RegisterForm } from "@/components/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6">Регистрация</h1>
          <RegisterForm />
          <p className="mt-4 text-gray-600">
            Уже есть аккаунт?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Войти
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
