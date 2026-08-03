'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  CalendarDays,
  Crown,
  Database,
  Download,
  Eraser,
  Home,
  Loader2,
  LogIn,
  LogOut,
  Pencil,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Trash2,
  UserPlus,
  Users,
  WalletCards,
  X,
} from 'lucide-react';

type AdminUser = {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: 'super_admin' | 'buyer';
  plan: 'full' | 'starter' | 'pro';
  status: 'demo_active' | 'active' | 'canceled';
  createdAt: string;
  lastLoginAt?: string;
};

type AdminActivity = {
  id: string;
  userId: string;
  type: string;
  detail: string;
  createdAt: string;
};

type MetricKey = 'buyers' | 'active' | 'full' | 'downloads';

const activityIcons: Record<string, typeof Activity> = {
  register: UserPlus,
  login: LogIn,
  logout: LogOut,
  download: Download,
  subscription_update: ShieldCheck,
};

const statusLabel: Record<AdminUser['status'], string> = {
  demo_active: 'Demo',
  active: 'Activo',
  canceled: 'Cancelado',
};

export default function AdminDashboard() {
  const locale = useLocale();
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [activities, setActivities] = useState<AdminActivity[]>([]);
  const [provider, setProvider] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeMetric, setActiveMetric] = useState<MetricKey>('buyers');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [draft, setDraft] = useState({
    fullName: '',
    phone: '',
    role: 'buyer' as AdminUser['role'],
    status: 'active' as AdminUser['status'],
  });

  const load = async () => {
    setError('');
    try {
      const response = await fetch('/api/admin/overview', { credentials: 'include' });
      const data = await response.json();
      if (response.status === 403) {
        router.replace(`/${locale}/miembros`);
        return;
      }
      if (!response.ok) throw new Error(data.error || 'No se pudo cargar el panel');

      setUsers(
        (data.users || []).map((user: Record<string, unknown>) => ({
          id: String(user.id),
          email: String(user.email),
          fullName: String(user.fullName || user.full_name || ''),
          phone: String(user.phone || ''),
          role: user.role === 'super_admin' ? 'super_admin' : 'buyer',
          plan: 'full',
          status:
            user.status === 'active' || user.status === 'canceled'
              ? user.status
              : 'demo_active',
          createdAt: String(user.createdAt || user.created_at || ''),
          lastLoginAt: user.lastLoginAt ? String(user.lastLoginAt) : undefined,
        }))
      );
      setActivities(
        (data.activities || []).map((item: Record<string, unknown>) => ({
          id: String(item.id),
          userId: String(item.userId || item.user_id || ''),
          type: String(item.type || item.event_type || ''),
          detail: String(item.detail || ''),
          createdAt: String(item.createdAt || item.created_at || ''),
        }))
      );
      setProvider(String(data.provider || ''));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'No se pudo cargar el panel');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buyers = users.filter((user) => user.role === 'buyer');
  const buyerCount = buyers.length;
  const activeCount = buyers.filter((user) =>
    ['active', 'demo_active'].includes(user.status)
  ).length;
  const fullAccessCount = buyers.filter(
    (user) => user.plan === 'full' || user.plan === 'pro' || user.plan === 'starter'
  ).length;
  const estimatedRevenue = buyerCount * 19.99;
  const activationRate = Math.min(
    100,
    Math.round((activeCount / Math.max(buyerCount, 1)) * 100)
  );
  const downloadActivities = useMemo(
    () => activities.filter((item) => item.type === 'download'),
    [activities]
  );
  const downloadCount = downloadActivities.length;
  const userById = useMemo(() => new Map(users.map((user) => [user.id, user])), [users]);

  const filteredUsers = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return users.filter((user) => {
      const matchesQuery =
        !normalized ||
        user.fullName.toLowerCase().includes(normalized) ||
        user.email.toLowerCase().includes(normalized) ||
        (user.phone || '').toLowerCase().includes(normalized);
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

      if (activeMetric === 'active') {
        return matchesQuery && ['active', 'demo_active'].includes(user.status);
      }
      if (activeMetric === 'full') {
        return matchesQuery && matchesStatus;
      }
      if (activeMetric === 'buyers') {
        return matchesQuery && matchesStatus && user.role === 'buyer';
      }
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter, users, activeMetric]);

  const selectedUser = selectedUserId
    ? users.find((user) => user.id === selectedUserId) || null
    : null;

  const selectedUserActivity = useMemo(() => {
    if (!selectedUserId) return [];
    return activities.filter((item) => item.userId === selectedUserId).slice(0, 8);
  }, [activities, selectedUserId]);

  useEffect(() => {
    if (!selectedUser) return;
    setDraft({
      fullName: selectedUser.fullName || '',
      phone: selectedUser.phone || '',
      role: selectedUser.role,
      status: selectedUser.status,
    });
  }, [selectedUser]);

  const openUser = (user: AdminUser) => {
    setSelectedUserId(user.id);
    setSuccess('');
    setError('');
  };

  const updateUser = async (
    id: string,
    patch: Partial<Pick<AdminUser, 'plan' | 'status' | 'role' | 'fullName' | 'phone'>>
  ) => {
    setUpdating(id);
    setError('');
    setSuccess('');
    try {
      const response = await fetch('/api/admin/overview', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id, ...patch }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'No se pudo actualizar');
      setUsers((current) =>
        current.map((user) => (user.id === id ? { ...user, ...patch } : user))
      );
      setSuccess('Cambios guardados correctamente');
      await load();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'No se pudo actualizar');
    } finally {
      setUpdating('');
    }
  };

  const saveSelectedUser = async () => {
    if (!selectedUser) return;
    await updateUser(selectedUser.id, {
      fullName: draft.fullName,
      phone: draft.phone,
      role: draft.role,
      status: draft.status,
    });
  };

  const clearActivity = async () => {
    setClearing(true);
    setError('');
    setSuccess('');
    try {
      const response = await fetch('/api/admin/overview', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ target: 'activity' }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'No se pudo limpiar');
      setActivities([]);
      setConfirmClear(false);
      setSuccess(data.message || 'Historial de actividad eliminado');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'No se pudo limpiar la actividad');
    } finally {
      setClearing(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    router.replace(`/${locale}/miembros`);
    router.refresh();
  };

  const metrics: Array<{
    key: MetricKey;
    label: string;
    value: number;
    note: string;
    badge: string;
    icon: typeof Users;
    color: string;
  }> = [
    {
      key: 'buyers',
      label: 'Compradores',
      value: buyerCount,
      note: `${users.length} cuentas registradas`,
      badge: 'Base de clientes',
      icon: Users,
      color: 'from-cyan-500 to-brand',
    },
    {
      key: 'active',
      label: 'Acceso activo',
      value: activeCount,
      note: `${activationRate}% de compradores`,
      badge: 'Salud del acceso',
      icon: CheckCircle2,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      key: 'full',
      label: 'Acceso Completo',
      value: fullAccessCount,
      note: 'Compra única $19.99',
      badge: 'Producto principal',
      icon: WalletCards,
      color: 'from-violet-500 to-indigo-600',
    },
    {
      key: 'downloads',
      label: 'Descargas',
      value: downloadCount,
      note: 'Actividad registrada',
      badge: 'Uso del producto',
      icon: Download,
      color: 'from-accent to-orange-600',
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#071822]">
        <Loader2 className="h-10 w-10 animate-spin text-cyan-300" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#071822] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(240,89,42,0.1),transparent_35%)]" />
      <div className="relative mx-auto max-w-[1440px] px-4 py-6 md:px-8 md:py-8">
        <header className="rounded-3xl border border-white/10 bg-white/[0.045] p-4 shadow-2xl shadow-black/10 backdrop-blur-xl md:p-5">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-brand to-cyan-700 shadow-lg shadow-cyan-950/40">
              <Crown className="h-7 w-7 text-white" />
              <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-[#102531] bg-emerald-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                KitNegocio · Super Admin
              </p>
              <h1 className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">
                Centro de control
              </h1>
              <p className="mt-1 text-sm text-white/55">
                Usuarios, compras, descargas y actividad en tiempo real
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="mr-1 hidden rounded-xl border border-white/10 bg-black/15 px-3 py-2 text-right lg:block">
              <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/35">
                <CalendarDays className="h-3 w-3" />
                Última consulta
              </p>
              <p className="mt-0.5 text-xs font-semibold text-white/75">
                {new Date().toLocaleDateString('es-MX', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
            <button
              type="button"
              onClick={() => router.push(`/${locale}`)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm font-semibold transition hover:border-white/20 hover:bg-white/10"
            >
              <Home className="h-4 w-4" />
              Inicio
            </button>
            <button
              type="button"
              onClick={load}
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/15 bg-cyan-300/[0.07] px-3.5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10"
            >
              <RefreshCw className="h-4 w-4" />
              Actualizar
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm font-semibold text-white/70 transition hover:border-red-300/20 hover:bg-red-300/[0.07] hover:text-red-100"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>
          </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-3">
            <div className="flex items-center gap-2 text-xs text-white/45">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-300/[0.08] px-2.5 py-1 font-semibold text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                Sistema operativo
              </span>
              <span className="hidden sm:inline">Acceso exclusivo y sesión protegida</span>
            </div>
            <span className="rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-200">
              Super administrador
            </span>
          </div>
        </header>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-100">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-100">
            {success}
          </div>
        )}

        <section className="mt-6 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-300/15 bg-gradient-to-br from-[#11313e] via-[#0b2531] to-[#0a1e2a] p-6">
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-cyan-300/10 blur-3xl" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200/80">
                  <TrendingUp className="h-4 w-4" />
                  Resumen comercial
                </p>
                <p className="mt-4 text-sm text-white/45">Ingresos estimados por accesos</p>
                <p className="mt-1 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
                  ${estimatedRevenue.toFixed(2)}
                  <span className="ml-2 text-sm font-medium text-white/35">USD</span>
                </p>
                <p className="mt-2 text-xs text-white/35">
                  {buyerCount} {buyerCount === 1 ? 'compra registrada' : 'compras registradas'} · Pago único
                </p>
              </div>
              <div className="w-full max-w-xs rounded-2xl border border-white/[0.08] bg-black/15 p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50">Accesos activos</span>
                  <span className="font-bold text-emerald-200">{activationRate}%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.07]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${activationRate}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                  />
                </div>
                <p className="mt-3 text-[11px] text-white/35">
                  {activeCount} de {buyerCount || 0} compradores con acceso disponible
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-3xl border border-white/10 bg-white/[0.045] p-4">
            <div className="rounded-2xl border border-white/[0.07] bg-black/15 p-4">
              <Database className="h-5 w-5 text-violet-300" />
              <p className="mt-4 text-2xl font-bold">{users.length}</p>
              <p className="mt-1 text-xs text-white/40">Cuentas totales</p>
            </div>
            <div className="rounded-2xl border border-white/[0.07] bg-black/15 p-4">
              <Activity className="h-5 w-5 text-orange-300" />
              <p className="mt-4 text-2xl font-bold">{activities.length}</p>
              <p className="mt-1 text-xs text-white/40">Eventos registrados</p>
            </div>
            <div className="col-span-2 flex items-center justify-between rounded-2xl border border-emerald-300/10 bg-emerald-300/[0.05] px-4 py-3">
              <div>
                <p className="text-xs font-semibold text-emerald-100">Base de datos conectada</p>
                <p className="mt-0.5 text-[10px] text-white/35">
                  {provider === 'supabase' ? 'Supabase Cloud' : 'Almacenamiento local seguro'}
                </p>
              </div>
              <CheckCircle2 className="h-5 w-5 text-emerald-300" />
            </div>
          </div>
        </section>

        <section className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {metrics.map((stat, index) => {
            const active = activeMetric === stat.key;
            return (
              <motion.button
                key={stat.key}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                onClick={() => setActiveMetric(stat.key)}
                className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all ${
                  active
                    ? 'border-cyan-300/40 bg-white/[0.1] shadow-[0_20px_50px_-30px_rgba(34,211,238,0.7)] ring-1 ring-cyan-300/30'
                    : 'border-white/10 bg-white/[0.045] hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07]'
                }`}
              >
                <div
                  className={`absolute right-0 top-0 h-24 w-24 rounded-full bg-gradient-to-br ${stat.color} opacity-10 blur-2xl transition group-hover:opacity-20`}
                />
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} shadow-lg shadow-black/15`}
                  >
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      active ? 'bg-cyan-300/15 text-cyan-200' : 'bg-white/5 text-white/40'
                    }`}
                  >
                    {active ? 'Viendo' : 'Explorar'}
                  </span>
                </div>
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/35">
                  {stat.badge}
                </p>
                <div className="mt-1 flex items-end justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-white/75">{stat.label}</p>
                    <p className="font-display text-3xl font-extrabold">{stat.value}</p>
                  </div>
                  <p className="mb-1 text-right text-[10px] text-white/35">{stat.note}</p>
                </div>
              </motion.button>
            );
          })}
        </section>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.55fr_0.8fr]">
          <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05]">
            <div className="border-b border-white/10 p-5 md:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="font-display text-xl font-bold">
                    {activeMetric === 'downloads'
                      ? 'Historial de descargas'
                      : activeMetric === 'active'
                        ? 'Accesos activos'
                        : activeMetric === 'full'
                          ? 'Acceso Completo'
                          : 'Compradores'}
                  </h2>
                  <p className="mt-1 text-sm text-white/45">
                    {activeMetric === 'downloads'
                      ? 'Revisa cada descarga y abre el perfil del usuario'
                      : 'Haz clic en cualquier tarjeta para ver y modificar los datos seguros'}
                  </p>
                </div>
                {activeMetric !== 'downloads' && (
                  <div className="flex gap-2">
                    <label className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                      <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Buscar..."
                        className="w-full rounded-xl border border-white/10 bg-black/20 py-2.5 pl-9 pr-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-cyan-400/50"
                      />
                    </label>
                    <select
                      value={statusFilter}
                      onChange={(event) => setStatusFilter(event.target.value)}
                      className="rounded-xl border border-white/10 bg-[#0c2530] px-3 text-sm text-white outline-none"
                    >
                      <option value="all">Todos</option>
                      <option value="demo_active">Demo</option>
                      <option value="active">Activo</option>
                      <option value="canceled">Cancelado</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {activeMetric === 'downloads' ? (
              <div className="divide-y divide-white/[0.07]">
                {downloadActivities.map((item) => {
                  const activityUser = userById.get(item.userId);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => activityUser && openUser(activityUser)}
                      className="flex w-full items-start gap-4 p-5 text-left transition-colors hover:bg-white/[0.035] md:p-6"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-400/15 text-orange-200">
                        <Download className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold">
                          {activityUser?.fullName || activityUser?.email || 'Usuario'}
                        </p>
                        <p className="mt-0.5 text-sm text-white/45">{item.detail}</p>
                        <p className="mt-1 text-[11px] text-white/30">
                          {new Date(item.createdAt).toLocaleString('es-MX')}
                        </p>
                      </div>
                      <Pencil className="mt-1 h-4 w-4 text-white/30" />
                    </button>
                  );
                })}
                {!downloadActivities.length && (
                  <div className="p-10 text-center text-sm text-white/40">
                    Aún no hay descargas registradas.
                  </div>
                )}
              </div>
            ) : (
              <div className="divide-y divide-white/[0.07]">
                {filteredUsers.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => openUser(user)}
                    className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-white/[0.035] md:p-6"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-brand/20 font-bold text-cyan-200">
                      {(user.fullName || user.email).slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate font-semibold">{user.fullName || 'Sin nombre'}</p>
                        {user.role === 'super_admin' && (
                          <Crown className="h-3.5 w-3.5 shrink-0 text-amber-300" />
                        )}
                      </div>
                      <p className="truncate text-sm text-white/45">{user.email}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                        <span className="rounded-full bg-white/5 px-2.5 py-1 text-white/55">
                          {statusLabel[user.status]}
                        </span>
                        <span className="rounded-full bg-white/5 px-2.5 py-1 text-white/55">
                          Acceso Completo
                        </span>
                        <span className="rounded-full bg-white/5 px-2.5 py-1 text-white/35">
                          Alta {new Date(user.createdAt).toLocaleDateString('es-MX')}
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-cyan-100">
                      <Pencil className="h-3.5 w-3.5" />
                      Editar
                    </span>
                  </button>
                ))}
                {!filteredUsers.length && (
                  <div className="p-10 text-center text-sm text-white/40">
                    No hay compradores con esos filtros.
                  </div>
                )}
              </div>
            )}
          </section>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 md:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-bold">Actividad reciente</h2>
                  <p className="mt-1 text-sm text-white/45">
                  {activities.length} registros del historial operativo
                </p>
              </div>
              <Activity className="h-5 w-5 text-cyan-300" />
            </div>

            <button
              type="button"
              onClick={() => setConfirmClear(true)}
              disabled={!activities.length}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-100 transition hover:bg-red-400/15 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Eraser className="h-4 w-4" />
              Limpiar historial de actividad
            </button>

            <div className="mt-6 space-y-5">
              {activities.slice(0, 12).map((item) => {
                const Icon = activityIcons[item.type] || Sparkles;
                const activityUser = userById.get(item.userId);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => activityUser && openUser(activityUser)}
                    className="relative flex w-full gap-3 text-left transition hover:opacity-90"
                  >
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-200">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <p className="truncate text-sm font-semibold">
                        {activityUser?.fullName || activityUser?.email || 'Sistema'}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-white/45">{item.detail}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-wide text-white/25">
                        {new Date(item.createdAt).toLocaleString('es-MX')}
                      </p>
                    </div>
                  </button>
                );
              })}
              {!activities.length && (
                <p className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-white/35">
                  Historial limpio. La nueva actividad aparecerá aquí.
                </p>
              )}
            </div>
          </aside>
        </div>

        <footer className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
            Solo se puede limpiar historial. No se eliminan cuentas, compras ni archivos.
          </p>
          <p className="flex items-center gap-1">
            Datos: {provider === 'supabase' ? 'Supabase Cloud' : 'almacenamiento local seguro'}
            <ArrowUpRight className="h-3 w-3" />
          </p>
        </footer>
      </div>

      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-end justify-center bg-[#020b12]/70 p-0 backdrop-blur-md sm:items-center sm:p-6"
          >
            <button
              type="button"
              aria-label="Cerrar"
              className="absolute inset-0"
              onClick={() => setSelectedUserId(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-[#0b1f2a] shadow-2xl sm:rounded-3xl"
            >
              <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#0e2a38] to-[#071822] p-6">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
                      Ficha del comprador
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-bold">
                      {selectedUser.fullName || 'Sin nombre'}
                    </h3>
                    <p className="mt-1 text-sm text-white/55">{selectedUser.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedUserId(null)}
                    className="rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-5 overflow-y-auto p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/45">
                      Nombre
                    </span>
                    <input
                      value={draft.fullName}
                      onChange={(event) =>
                        setDraft((current) => ({ ...current, fullName: event.target.value }))
                      }
                      className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-cyan-400/50"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/45">
                      Teléfono
                    </span>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                      <input
                        value={draft.phone}
                        onChange={(event) =>
                          setDraft((current) => ({ ...current, phone: event.target.value }))
                        }
                        className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-10 pr-4 text-sm outline-none focus:border-cyan-400/50"
                        placeholder="Opcional"
                      />
                    </div>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/45">
                      Estado de acceso
                    </span>
                    <select
                      value={draft.status}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          status: event.target.value as AdminUser['status'],
                        }))
                      }
                      className="w-full rounded-xl border border-white/10 bg-[#0c2530] px-4 py-3 text-sm outline-none"
                    >
                      <option value="demo_active">Demo</option>
                      <option value="active">Activo</option>
                      <option value="canceled">Cancelado</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/45">
                      Rol
                    </span>
                    <select
                      value={draft.role}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          role: event.target.value as AdminUser['role'],
                        }))
                      }
                      className="w-full rounded-xl border border-white/10 bg-[#0c2530] px-4 py-3 text-sm outline-none"
                    >
                      <option value="buyer">Comprador</option>
                      <option value="super_admin">Admin</option>
                    </select>
                  </label>
                </div>

                <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:grid-cols-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-white/35">Producto</p>
                    <p className="mt-1 text-sm font-semibold">Acceso Completo</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-white/35">Alta</p>
                    <p className="mt-1 text-sm font-semibold">
                      {new Date(selectedUser.createdAt).toLocaleDateString('es-MX')}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-white/35">Último acceso</p>
                    <p className="mt-1 text-sm font-semibold">
                      {selectedUser.lastLoginAt
                        ? new Date(selectedUser.lastLoginAt).toLocaleString('es-MX')
                        : 'Sin registro'}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/45">
                    Actividad reciente de este usuario
                  </p>
                  <div className="space-y-3">
                    {selectedUserActivity.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-xl border border-white/10 bg-black/15 px-4 py-3"
                      >
                        <p className="text-sm text-white/80">{item.detail}</p>
                        <p className="mt-1 text-[11px] text-white/35">
                          {new Date(item.createdAt).toLocaleString('es-MX')}
                        </p>
                      </div>
                    ))}
                    {!selectedUserActivity.length && (
                      <p className="rounded-xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-white/35">
                        Sin actividad reciente.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 bg-[#071822] p-4 sm:p-5">
                <button
                  type="button"
                  onClick={saveSelectedUser}
                  disabled={updating === selectedUser.id}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-brand px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-950/30 transition hover:brightness-110 disabled:opacity-60"
                >
                  {updating === selectedUser.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4" />
                  )}
                  Guardar cambios
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmClear && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-[#020b12]/75 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0b1f2a] p-6 shadow-2xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-400/15 text-red-200">
                <Trash2 className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">¿Limpiar historial?</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                Se eliminarán <strong className="text-white">{activities.length}</strong> registros
                de actividad. Esta acción no borra cuentas, compras ni archivos del producto.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmClear(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold hover:bg-white/10"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={clearActivity}
                  disabled={clearing}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-bold text-white hover:bg-red-400 disabled:opacity-60"
                >
                  {clearing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Eraser className="h-4 w-4" />}
                  Eliminar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
