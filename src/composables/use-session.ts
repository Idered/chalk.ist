import { Session } from "@supabase/supabase-js";
import { onMounted, ref } from "vue";
import { supabase } from "~/lib/supabase";

export function useSession() {
  const session = ref<Session | null>(null);

  onMounted(() => {
    supabase.auth.getSession().then(({ data }) => {
      session.value = data.session;
    });

    supabase.auth.onAuthStateChange((_, _session) => {
      session.value = _session;
    });
  });

  return session;
}
