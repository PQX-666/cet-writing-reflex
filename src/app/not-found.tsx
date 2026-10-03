import Link from "next/link";
export default function NotFound() { return <div className="empty"><p className="eyebrow">404</p><h1>这道题暂时找不到</h1><p>可以从真题课堂重新选择，旧学习记录仍保留在本机。</p><Link className="button primary" href="/classroom">返回真题课堂</Link></div>; }
