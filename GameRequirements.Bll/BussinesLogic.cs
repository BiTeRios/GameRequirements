using GameRequirements.Bll.BL;
using GameRequirements.Bll.Helper.Token;
using GameRequirements.Bll.Interface;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameRequirements.Bll
{
    public class BussinesLogic
    {
        private readonly ISessionBL _session;

        public BussinesLogic(ISessionBL session)
        {
            _session = session;
        }

        public ISessionBL GetSessionBL()
        {
            return _session;
        }
    }
}
