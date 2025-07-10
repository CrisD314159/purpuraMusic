"use client";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import WebIcon from '@mui/icons-material/Web';
import Image from "next/image";
import { Button } from "@mui/material";
import Link from "next/link";

export default function InfoPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-gradient-to-r from-purple-800 via-black to-purple-800 opacity-20"></div>
        <div className="absolute w-full h-full bg-noise opacity-30"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 text-center px-6">
        {/* Logo */}
        <div className="mb-6 animate-pulse">
          <Image
            src="/purpura-entire-logo.png"
            alt="Púrpura Music"
            className="mx-auto"
            width={300}
            height={300}
          />
        </div>

        {/* Nombre de la App */}
        <p className="mt-2 text-xl text-gray-300 neon-text">
          A cool way to enjoy music.
        </p>

        {/* Información del Creador */}
        <div className="mt-6">
          <p className="text-2xl font-semibold">
            Created by:{" "}
            <span className="text-purple-300">
              Cristian David Vargas Loaiza
            </span>
          </p>
        </div>

        {/* Links */}
        <div className="mt-6 flex gap-6 justify-center text-4xl">
          <a
            href="www.linkedin.com/in/cristian-david-vargas-loaiza-982314271"
            target="_blank"
            className="text-purple-400 hover:text-purple-300 transition-all"
          >
            <LinkedInIcon fontSize="inherit" />
          </a>
          <a
            href="https://github.com/CrisD314159"
            target="_blank"
            className="text-purple-400 hover:text-purple-300 transition-all"
          >
            <GitHubIcon fontSize="inherit" />
          </a>
          <a
            href="https://crisdev-pi.vercel.app"
            target="_blank"
            className="text-purple-400 hover:text-purple-300 transition-all"
          >
            <WebIcon fontSize="inherit" />
          </a>
        </div>
        <Button color="info" sx={{marginTop: 4}} LinkComponent={Link} href="/dashboard">
          Go to back to home page
        </Button>
        <Button color="warning" sx={{marginTop: 4}} LinkComponent={Link} href="https://crisdev-pi.vercel.app/privacy-policy">
          Privacy Policy
        </Button>
      </div>

      {/* Estilos y animaciones */}
      <style jsx>{`
        .neon-text {
          text-shadow: 0 0 10px #bb86fc, 0 0 20px #bb86fc, 0 0 40px #bb86fc;
        }

        @keyframes floating {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .animate-pulse {
          animation: floating 4s ease-in-out infinite;
        }

        .bg-noise {
          background: url("/noise-texture.png");
          background-size: cover;
        }
      `}</style>
    </div>
  );
}