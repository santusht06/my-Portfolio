import React, { useState } from "react";
// SVGs directly sourced from https://techicons.dev/ (devicons repository)
import fastapiSvg from "../assets/tech/fastapi.svg";
import postgresqlSvg from "../assets/tech/postgresql.svg";
import sqlalchemySvg from "../assets/tech/sqlalchemy.svg";
import awsSvg from "../assets/tech/aws.svg";
import redisSvg from "../assets/tech/redis.svg";
import dockerSvg from "../assets/tech/docker.svg";
import kubernetesSvg from "../assets/tech/kubernetes.svg";
import githubActionsSvg from "../assets/tech/github-actions.svg";
import oauthSvg from "../assets/tech/oauth.svg";
import jwtSvg from "../assets/tech/jwt.svg";

// Additional techicons.dev assets for complete portfolio consistency
import pythonSvg from "../assets/tech/python.svg";
import goSvg from "../assets/tech/go.svg";
import reactSvg from "../assets/tech/react.svg";
import nextjsSvg from "../assets/tech/nextjs.svg";
import tailwindSvg from "../assets/tech/tailwindcss.svg";
import typescriptSvg from "../assets/tech/typescript.svg";
import javascriptSvg from "../assets/tech/javascript.svg";
import mongodbSvg from "../assets/tech/mongodb.svg";
import mysqlSvg from "../assets/tech/mysql.svg";
import graphqlSvg from "../assets/tech/graphql.svg";
import nodejsSvg from "../assets/tech/nodejs.svg";
import postmanSvg from "../assets/tech/postman.svg";
import reduxSvg from "../assets/tech/redux.svg";
import gitSvg from "../assets/tech/git.svg";
import linuxSvg from "../assets/tech/linux.svg";
import nginxSvg from "../assets/tech/nginx.svg";
import figmaSvg from "../assets/tech/figma.svg";
import cockroachdbSvg from "../assets/tech/cockroachdb.svg";
import minioSvg from "../assets/tech/minio.svg";
import langchainSvg from "../assets/tech/langchain.svg";
import Dock from "./Dock";

import {
  TbNetwork,
  TbMail,
  TbComponents,
  TbDatabase,
  TbServer,
  TbCpu,
  TbApi,
  TbPlugConnected,
} from "react-icons/tb";

// Map normalized keys to techicons.dev SVGs and brand styling
const TECH_MAP = {
  // 10 Core technologies explicitly requested
  fastapi: { svg: fastapiSvg },
  postgresql: { svg: postgresqlSvg },
  postgres: { svg: postgresqlSvg },
  sqlalchemy: { svg: sqlalchemySvg },
  aws: { svg: awsSvg, className: "dark:brightness-150" },
  redis: { svg: redisSvg },
  docker: { svg: dockerSvg },
  kubernetes: { svg: kubernetesSvg },
  k8s: { svg: kubernetesSvg },
  githubactions: { svg: githubActionsSvg },
  oauth: { svg: oauthSvg },
  oauth20: { svg: oauthSvg },
  oauth2: { svg: oauthSvg },
  jwt: { svg: jwtSvg },
  jsonwebtokens: { svg: jwtSvg },

  // Additional technologies present across projects and experience
  python: { svg: pythonSvg },
  golang: { svg: goSvg },
  go: { svg: goSvg },
  react: { svg: reactSvg },
  react19: { svg: reactSvg },
  nextjs: { svg: nextjsSvg, className: "dark:invert" },
  tailwindcss: { svg: tailwindSvg },
  typescript: { svg: typescriptSvg },
  javascript: { svg: javascriptSvg },
  mongodb: { svg: mongodbSvg },
  mysql: { svg: mysqlSvg },
  graphql: { svg: graphqlSvg },
  nodejs: { svg: nodejsSvg },
  postman: { svg: postmanSvg },
  redux: { svg: reduxSvg },
  reduxtoolkit: { svg: reduxSvg },
  git: { svg: gitSvg },
  linux: { svg: linuxSvg },
  nginx: { svg: nginxSvg },
  figma: { svg: figmaSvg },
  cockroachdb: { svg: cockroachdbSvg },
  cockroach: { svg: cockroachdbSvg },
  minio: { svg: minioSvg },
  langchain: { svg: langchainSvg, className: "dark:invert" },

  // Distributed Systems & Architectural Concepts
  distributedsystems: { icon: TbNetwork, color: "#8B5CF6" },
  architecture: { icon: TbComponents, color: "#6366F1" },
  systemdesign: { icon: TbComponents, color: "#6366F1" },
  microservices: { icon: TbServer, color: "#8B5CF6" },
  restapi: { icon: TbApi, color: "#10B981" },
  websockets: { icon: TbPlugConnected, color: "#06B6D4" },
  smtp: { icon: TbMail, color: "#F59E0B" },
  imap: { icon: TbMail, color: "#F59E0B" },
  pop3: { icon: TbMail, color: "#F59E0B" },
  smtpimap: { icon: TbMail, color: "#F59E0B" },
  sql: { icon: TbDatabase, color: "#00758F" },
};

function getTechInfo(tech) {
  if (!tech) return { icon: TbCpu, color: "#909092" };
  const key = tech.toLowerCase().replace(/[^a-z0-9]/g, "");
  return TECH_MAP[key] || { icon: TbCpu, color: "#909092" };
}

/**
 * Expandable capsule pill matching ramx.in/work "Technologies & Tools"
 * Compact square with dashed border by default. Expands to icon + label on hover, focus, or tap.
 * Logos sourced directly from techicons.dev
 */
export const TechStackPill = ({ tech, defaultExpanded = false }) => {
  const [isToggled, setIsToggled] = useState(defaultExpanded);
  const info = getTechInfo(tech);
  const FallbackIcon = info.icon;

  return (
    <button
      type="button"
      onClick={() => setIsToggled((prev) => !prev)}
      title={tech}
      className={`group/pill inline-flex items-center rounded-lg border border-dashed border-[#909092]/30 dark:border-[#909092]/40 bg-black/[0.03] dark:bg-white/[0.04] px-2.5 py-1.5 text-xs sm:text-sm font-medium font-mono text-zinc-900 dark:text-zinc-100 outline-none transition-all duration-300 ease-out hover:scale-[1.03] hover:border-black/35 dark:hover:border-white/35 hover:bg-black/[0.06] dark:hover:bg-white/[0.07] hover:shadow-xs focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-white cursor-pointer select-none ${
        isToggled
          ? "border-black/35 dark:border-white/35 bg-black/[0.06] dark:bg-white/[0.07]"
          : ""
      }`}
    >
      <span className="size-4 shrink-0 flex items-center justify-center">
        {info.svg ? (
          <img
            src={info.svg}
            alt={`${tech} logo`}
            width={16}
            height={16}
            loading="lazy"
            decoding="async"
            className={`size-4 shrink-0 object-contain select-none pointer-events-none ${info.className || ""}`}
          />
        ) : (
          <FallbackIcon
            className="size-4 shrink-0"
            style={{ color: info.color }}
          />
        )}
      </span>
      <span
        className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-out font-mono tracking-tight ${
          isToggled
            ? "max-w-44 opacity-100 ml-2"
            : "max-w-0 opacity-0 ml-0 group-hover/pill:max-w-44 group-hover/pill:opacity-100 group-hover/pill:ml-2 group-focus-visible/pill:max-w-44 group-focus-visible/pill:opacity-100 group-focus-visible/pill:ml-2 group-hover/pill:delay-75 group-focus-visible/pill:delay-75"
        }`}
      >
        {tech}
      </span>
    </button>
  );
};

/**
 * Interactive macOS Dock component for technology icons
 */
export const TechDock = ({
  technologies = [],
  className = "",
  panelHeight = 50,
  baseItemSize = 34,
  magnification = 54,
  distance = 120,
}) => {
  if (!technologies || technologies.length === 0) return null;

  const items = technologies.map((tech) => {
    const info = getTechInfo(tech);
    const FallbackIcon = info.icon;

    return {
      label: tech,
      icon: info.svg ? (
        <img
          src={info.svg}
          alt={`${tech} logo`}
          width={22}
          height={22}
          loading="lazy"
          className={`size-full object-contain select-none pointer-events-none ${info.className || ""}`}
        />
      ) : (
        <FallbackIcon className="size-full" style={{ color: info.color }} />
      ),
    };
  });

  return (
    <Dock
      items={items}
      panelHeight={panelHeight}
      baseItemSize={baseItemSize}
      magnification={magnification}
      distance={distance}
      className={className}
    />
  );
};

/**
 * Container rendering technology icons with React Bits Dock magnification effect
 */
export const TechStackPills = ({
  technologies = [],
  className = "",
  variant = "dock", // "dock" | "capsule"
  panelHeight = 48,
  baseItemSize = 34,
  magnification = 52,
}) => {
  if (!technologies || technologies.length === 0) return null;

  if (variant === "capsule") {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {technologies.map((tech) => (
          <TechStackPill key={tech} tech={tech} />
        ))}
      </div>
    );
  }

  return (
    <TechDock
      technologies={technologies}
      className={className}
      panelHeight={panelHeight}
      baseItemSize={baseItemSize}
      magnification={magnification}
    />
  );
};

export { Dock };
export default TechStackPills;
