import React from 'react';
import { ShieldAlert, Info, Phone } from 'lucide-react';
import { motion } from 'motion/react';

export function HelpSection() {
  const faqs = [
    {
      title: 'Como identificar um golpe?',
      content: 'Fique atento a mensagens urgentes pedindo dinheiro, links desconhecidos por SMS ou e-mail, e promessas de dinheiro fácil online. Sempre desconfie e nunca passe senhas.',
      icon: <ShieldAlert className="w-6 h-6 text-yellow-500" />
    },
    {
      title: 'O que fazer se eu cair num golpe?',
      content: 'Mantenha a calma. Avise seu banco imediatamente pelo número oficial no verso do cartão. Mude suas senhas. Faça um Boletim de Ocorrência na polícia.',
      icon: <Info className="w-6 h-6 text-blue-500" />
    },
    {
      title: 'Contatos Úteis',
      content: 'Procon: Ligue 151.\nPolícia Militar: Ligue 190.\nDisque Denúncia: Ligue 181.',
      icon: <Phone className="w-6 h-6 text-green-500" />
    }
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-5 rounded-xl border-2 border-slate-100 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            {faq.icon}
            <h3 className="text-xl font-bold text-slate-800">{faq.title}</h3>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed font-medium whitespace-pre-line">
            {faq.content}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
